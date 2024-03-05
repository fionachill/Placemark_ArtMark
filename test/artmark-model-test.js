import { assert } from "chai";
import { db } from "../src/models/db.js";
import { monument, testArtmarks } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";
import { EventEmitter } from "events";


EventEmitter.setMaxListeners(25);

suite("Artmark Model tests", () => {

    setup(async () => {
        db.init("mongo");
        await db.artmarkStore.deleteAllArtmarks();
        for (let i = 0; i < testArtmarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testArtmarks[i] = await db.artmarkStore.addArtmark(testArtmarks);
        }
    });

    test("create an artmark", async () => {
        const artmark = await db.artmarkStore.addArtmark(monument);
        assertSubset(monument, artmark);
        assert.isDefined(artmark._id);
    });

    test("delete all artmarks", async() => {
        let returnedArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.equal(returnedArtmarks.length, 2);
        await db.artmarkStore.deleteAllArtmarks();
        returnedArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.equal(returnedArtmarks.length, 0);
    });

    test("get an artmark - success", async () => {
        const artmark = await db.artmarkStore.addArtmark(monument);
        const returnedArtmark = await db.artmarkStore.getArtmarkById(artmark._id);
        assert.equal(monument, artmark);
    });

    test("delete one artmark - success", async () => {
        const id = testArtmarks[0]._id;
        await db.artmarkStore.deleteArtmarkById(id);
        const returnedArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.equal(returnedArtmarks.length, testArtmarks.length - 1);
        const deletedArtmark = await db.artmarkStore.getArtmarkById(id);
        assert.isNull(deletedArtmark);
    });

    test("get a playlist - bad params", async () => {
        assert.isNull(await db.artmarkStore.getArtmarkById(""));
        assert.isNull(await db.artmarkStore.getArtmarkById());
    });

    test("delete one artmark - fail", async () => {
        await db.artmarkStore.deleteArtmarkById("bad-id");
        const allArtmarks = await db.artmarkStore.getAllArtmarks();
        assert.equal(testArtmarks.length, allArtmarks.length);
    });

    
});