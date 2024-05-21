import bcrypt from "bcrypt";
import { User } from "./user.js";
import { passwordUtils } from "../password-utils.js";

export const userMongoStore = {
    async getAllUsers() {
        const users = await User.find().lean();
        return users;
    },

    async getUserById(id) {
        if (id) {
            const user = await User.findOne({ _id: id }).lean();
            return user;
        }
        return null;
    },

    async addUser(user) {
        const newUser = new User(user);
        // eslint-disable-next-line prefer-destructuring
        const password = newUser.password;
        const safePassword = await passwordUtils.hashPassword(password);
        console.log(safePassword);
        newUser.password = safePassword;
        const userObj = await newUser.save();
        const u = await this.getUserById(userObj._id);
        return u;
    },

    async getUserByEmail(email) {
        const user = await User.findOne({ email: email }).lean();
        return user;
    },

    async deleteUserById(userId) {
        try {
            await User.deleteOne({ _id: userId });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAll() {
        await User.deleteMany({});
    },

    async updateUser(userId, updatedUser) {
        const userDoc = await User.findOne({ _id: userId });
        userDoc.firstName = updatedUser.firstName;
        userDoc.lastName = updatedUser.lastName;
        userDoc.email = updatedUser.email;
        password = updatedUser.password;
        userDoc.password = await passwordUtils.hashPassword(UpdatedUser.password);
        await userDoc.save();
        return userDoc;
    },

    async hashPassword(password) {       
        try {
            const hashPassword = await bcrpyt.hash(password, 10); 
            return hashPassword;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async comparePasswords(password, hashPassword) {
        const result = await bcrpyt.compare(password, hashPassword);
        return result;
    },
};