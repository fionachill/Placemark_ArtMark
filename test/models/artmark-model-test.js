import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { monument, testArtmarks, betty } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


EventEmitter.setMaxListeners(25);

suite("Artmark Model tests", () => {

    let testUser = null;

    setup(async () => {
        db.init("mongo");
        await db.artmarkStore.deleteAllArtmarks();
        testUser = await db.userStore.addUser(betty);
        for (let i = 0; i < testArtmarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testArtmarks[i] = await db.artmarkStore.addArtmark(testUser._id, testArtmarks);
        }
    });

    test("create an artmark", async () => {
        const user = await db.userStore.addUser(betty);
        const artmark = await db.artmarkStore.addArtmark(user._id, monument);
        assertSubset(monument, artmark);
        assert.isDefined(artmark._id);
    });

    test("delete all artmarks", async() => {
        let returnedArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.notEqual(returnedArtmarks.length, 0);
        await db.artmarkStore.deleteAllArtmarks();
        returnedArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.equal(returnedArtmarks.length, 0);
    });

    test("get an artmark - success", async () => {
        const user = await db.userStore.addUser(betty);
        const artmark = await db.artmarkStore.addArtmark(user._id, monument);
        const returnedArtmark = await db.artmarkStore.getArtmarkById(artmark._id);
        assertSubset(monument, artmark);
    });

    test("delete one artmark - success", async () => {
        const id = testArtmarks[0]._id;
        await db.artmarkStore.deleteArtmarkById(id);
        const returnedArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.equal(returnedArtmarks.length, testArtmarks.length - 1);
        const deletedArtmark = await db.artmarkStore.getArtmarkById(id);
        assert.isNull(deletedArtmark);
    });

    test("get an artmark - bad params", async () => {
        assert.isNull(await db.artmarkStore.getArtmarkById(""));
        assert.isNull(await db.artmarkStore.getArtmarkById());
    });

    test("delete one artmark - fail", async () => {
        await db.artmarkStore.deleteArtmarkById("bad-id");
        const allArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.equal(testArtmarks.length, allArtmarks.length);
    });


    
});