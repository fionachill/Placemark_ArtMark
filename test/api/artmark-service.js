import axios from "axios";

import { betty, serviceUrl } from "../fixtures.js";

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

    async deleteUser(id) {
        const res = await axios.delete(`${this.artmarkUrl}/api/users/${id}`);
        return res.data;
    },

    async authenticate(user) {
        const response = await axios.post(`${this.artmarkUrl}/api/users/authenticate`, user);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        return response.data;
    },

    async clearAuth() {
        axios.defaults.headers.common["Authorization"] = "";
    },

    async createArtmark(artmark) {
        const res = await axios.post(`${this.artmarkUrl}/api/artmarks`, artmark);
        return res.data;
    },

    async deleteAllArtmarks() {
        const res = await axios.delete(`${this.artmarkUrl}/api/artmarks`);
        return res.data;
    },

    async deleteArtmark(id) {
        const res = await axios.delete(`${this.artmarkUrl}/api/artmarks/${id}`);
        return res;
    },

    async getAllArtmarks() {
        const res = await axios.get(`${this.artmarkUrl}/api/artmarks`);
        return res.data;
    },

    async getArtmark(id) {
        const res = await axios.get(`${this.artmarkUrl}/api/artmarks/${id}`);
        return res.data;
    },

};