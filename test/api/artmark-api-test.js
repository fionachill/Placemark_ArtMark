import { EventEmitter } from "events";
import { assert } from "chai";
import { artmarkService } from "./artmark-service.js";
import { assertSubset } from "../test-utils.js";
import { betty, bettyCredentials, monument, testArtmarks } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Artmark API tests", () => {
    
    let user = null;

    const artmarks = new Array(testArtmarks.length);

    setup(async () => {
        artmarkService.clearAuth();
        user = await artmarkService.createUser(betty);
        await artmarkService.authenticate(bettyCredentials);
        await artmarkService.deleteAllArtmarks();
        await artmarkService.deleteAllUsers();
        user = await artmarkService.createUser(betty);
        await artmarkService.authenticate(bettyCredentials);
        monument.userid = user._id;
    });

    teardown(async () => {});

    test("create artmark", async () => {
        const returnedArtmark = await artmarkService.createArtmark(monument);
        assert.isNotNull(returnedArtmark);
        assertSubset(monument,returnedArtmark);
    });

    test("delete one artmark", async ()=> {
        const artmark = await artmarkService.createArtmark(monument);
        const response = await artmarkService.deleteArtmark(artmark._id);
        assert.equal(response.status, 204);
        try {
            const returnedArtmark = await artmarkService.getArtmark(artmark._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Artmark with this id", "Incorrect Response Message");
        }
    });

    test("create multiple artmarks", async () => {
        for (let i = 0; i < testArtmarks.length; i += 1) {
            testArtmarks[0].userid = user._id;
            // eslint-disable-next-line no-await-in-loop
            await artmarkService.createArtmark(testArtmarks[i]);
        }
        let returnedLists = await artmarkService.getAllArtmarks();
        assert.equal(returnedLists.length, testArtmarks.length);
        await artmarkService.deleteAllArtmarks();
        returnedLists = await artmarkService.getAllArtmarks();
        assert.equal(returnedLists.length, 0);
    });

    test("remove non-existant artmark", async () => {
        try {
            const response = await artmarkService.deleteArtmark("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Artmark with this id", "Incorrect Response Message");
        }
    });

})