import { Artmark } from "./artmark.js";

export const artmarkMongoStore = {
    async getAllArtmarks() {
        const artmarks = await Artmark.find().lean();
        return artmarks;
    },

    async getArtmarkById(id) {
        if (id) {
            const artmark = await Artmark.findOne({ _id: id }).lean();
            return artmark;
        }
        return null;
    },

    async addArtmark(artmark) {
        const newArtmark = new Artmark(artmark);
        const playlistObj = await newArtmark.save();
        return this.getArtmarkById(artmarkObj._id);
    },

    async getUserArtmarks(id) {
        const artmark = await Artmark.find({ userid: id }).lean();
        return artmark;
    },

    async deleteArtmarkById(id) {
        try {
            await Artmark.deleteOne({ _id: id});
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllArtmarks() {
        await Artmark.deleteMany({});
    }
};