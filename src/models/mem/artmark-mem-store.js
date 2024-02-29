import { v4 } from "uuid";
// Will these be called collections? ArtMarks... portfolio?

let artmarks = [];

export const artmarkMemStore = {
    async getAllArtmarks() {
        return artmarks;
    },

    async addArtMark(artmark) {
        artmark._id = v4();
        artmarks.push(artmark);
        return artmark;
    },

    async getArtmarkById(id) {
        return artmarks.find((artmark) => artmark._id === id);
    },

    async deleteArtmarkById(id) {
        const index = artmarks.findIndex((artmark) => artmark._id === id);
        artmarks.splice(index, 1);
    },

    async deleteAllArtmarks() {
        artmarks = [];
    },
};