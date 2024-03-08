import { assert } from "chai";
import { artmarkService } from "./artmark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { betty, bettyCredentials } from "../fixtures.js";

suite("Authentication API tests", async() => {
    setup(async () => {
        artmarkService.clearAuth();
        await artmarkService.createUser(betty);
        await artmarkService.authenticate(bettyCredentials);
        await artmarkService.deleteAllUsers();
    });

    test("authenticate", async () => {
        const returnedUser = await artmarkService.createUser(betty);
        const response = await artmarkService.authenticate(bettyCredentials);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("verify Token", async () => {
        const returnedUser = await artmarkService.createUser(betty);
        const response = await artmarkService.authenticate(bettyCredentials);

        const userInfo = decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });

    test("check Unauthorized", async () => {
        artmarkService.clearAuth();
        try {
            await artmarkService.deleteAllUsers();
            assert.fail("Route not protected");
        } catch (error) {
            assert.equal(error.response.data.statusCode, 401);
        }
    });

});