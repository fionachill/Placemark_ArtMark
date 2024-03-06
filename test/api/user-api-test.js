import { assert } from "chai";
import { artmarkService } from "./artmark-service.js";
import { assertSubset } from "../test-utils.js";
import { betty, testUsers } from "../fixtures.js";

suite("User API tests", () => {
    setup(async () => {
        await artmarkService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1){
            // eslint-disable-next-line no-await-in-loop
            testUsers[i] = await artmarkService.createUser(testUsers[i]);
        }
    });
    teardown(async () => {
    });

    test("create a user", async () => {
        const newUser = await artmarkService.createUser(betty);
        assertSubset(betty, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all users", async () => {
        let returnedUsers = await artmarkService.getAllUsers();
        assert.equal(returnedUsers.length, 3);
        await artmarkService.deleteAllUsers();
        returnedUsers = await artmarkService.getAllUsers();
        assert.equal(returnedUsers.length, 0);
    });

    test("get a user - success", async () => {
        const returnedUser = await artmarkService.getUser(testUsers[0]._id);
        assert.deepEqual(testUsers[0], returnedUser);
    });

    test("get a user - fail", async () => {
        try {
            const returnedUser = await artmarkService.getUser("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a user - deleted user", async () => {
        await artmarkService.deleteAllUsers();
        try {
            const returnedUser = await artmarkService.getUser(testUsers[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });


});