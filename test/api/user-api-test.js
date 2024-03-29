import { assert } from "chai";
import { artmarkService } from "./artmark-service.js";
import { assertSubset } from "../test-utils.js";
import { betty, bettyCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
    setup(async () => {
        artmarkService.clearAuth();
        await artmarkService.createUser(betty);
        await artmarkService.authenticate(bettyCredentials);
        await artmarkService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1){
            // eslint-disable-next-line no-await-in-loop
            users[0] = await artmarkService.createUser(testUsers[i]);
        }
        await artmarkService.createUser(betty);
        await artmarkService.authenticate(bettyCredentials);
    });
    teardown(async () => {});

    test("create a user", async () => {
        const newUser = await artmarkService.createUser(betty);
        assertSubset(betty, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all users", async () => {
        let returnedUsers = await artmarkService.getAllUsers();
        assert.equal(returnedUsers.length, 4);
        await artmarkService.deleteAllUsers();
        await artmarkService.createUser(betty);
        await artmarkService.authenticate(bettyCredentials);
        returnedUsers = await artmarkService.getAllUsers();
        assert.equal(returnedUsers.length, 1);
    });

    test("get a user - success", async () => {
        const returnedUser = await artmarkService.getUser(users[0]._id);
        assert.deepEqual(users[0], returnedUser);
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
        await artmarkService.createUser(betty);
        await artmarkService.authenticate(bettyCredentials);
        try {
            const returnedUser = await artmarkService.getUser(users[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });


});