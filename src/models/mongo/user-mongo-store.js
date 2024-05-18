import { User } from "./user.js";

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
        userDoc.password = updatedUser.password;
        await userDoc.save();
        return userDoc;
    },
};