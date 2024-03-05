import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const artmarkJsonStore = {
    async getAllArtmarks() {
        await db.read();
        return db.data.artmarks;
    },

    async addArtmark(artmark) {
        await db.read();
        artmark._id = v4();
        db.data.artmarks.push(artmark);
        await db.write();
        return artmark;
    },

    async getArtmarkById(id) {
        await db.read();
        let returnedArtmark = db.data.artmarks.find((artmark) => artmark._id === id);
        if (returnedArtmark === undefined) returnedArtmark = null;
        return returnedArtmark;
        },

    async getUserArtmarks(userid) {
        await db.read();
        return db.data.artmarks.filter((artmark) => artmark.userid === userid);
    },

    async deleteArtmarkById(id) {
        await db.read();
        const index = db.data.artmarks.findIndex((artmark) => artmark._id === id);
        if (index !== -1) db.data.artmarks.splice(index, 1);
        await db.write();
    },

    async deleteAllArtmarks() {
        db.data.artmarks = [];
        await db.write();
    },

    async updateArtmark(artmark, updatedArtmark) {
        artmark.category = updatedArtmark.category;
        artmark.title = updatedArtmark.title;
        artmark.artist = updatedArtmark.artist;
        artmark.description = updatedArtmark.description;
        artmark.location = updatedArtmark.location;
        artmark.latitude = updatedArtmark.latitude;
        artmark.longitude = updatedArtmark.longitude;
        artmark.access = updatedArtmark.access;
        await db.write();
    },
};