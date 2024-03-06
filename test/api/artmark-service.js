import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const artmarkService = {
    artmarkUrl: serviceUrl,

    async createUser(user) {
        const res = await axios.post(`${this.artmarkUrl}/api/users`, user);
        return res.data;
    },

    async getUser(id) {
        const res = await axios.get(`${this.artmarkUrl}/api/users/${id}`);
        return res.data;
    },

    async getAllUsers() {
        const res = await axios.get(`${this.artmarkUrl}/api/users`);
        return res.data;
    },

    async deleteAllUsers() {
        const res = await axios.delete(`${this.artmarkUrl}/api/users`);
        return res.data;
    },
};