import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { monument, betty, testReview, badReview } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => {
    setup(async () => {
        db.init("mongo");
        await db.artmarkStore.deleteAllArtmarks();
        await db.reviewStore.deleteAllReviews();
    });

    test("create a review", async () => {
        const user = await db.userStore.addUser(betty);
        const artmark = await db.artmarkStore.addArtmark(user._id, monument);
        const newReview = await db.reviewStore.addReview(user._id, artmark._id, testReview);
        assert.equal(testReview.reviewText, newReview.reviewText);
    });

    test("create a review - no text", async () => {
        const user = await db.userStore.addUser(betty);
        const artmark = await db.artmarkStore.addArtmark(user._id, monument);
        const newBadReview = await db.reviewStore.addReview(user._id, artmark._id, badReview);
        assert.isNull(newBadReview);
    })

    test("delete a review - success", async () => {
        const user = await db.userStore.addUser(betty);
        const artmark = await db.artmarkStore.addArtmark(user._id, monument);
        const newReview = await db.reviewStore.addReview(user._id, artmark._id, testReview);
        const deletedReview = await db.reviewStore.deleteReview(newReview._id);
        assert.isNull(deletedReview);
    })

});