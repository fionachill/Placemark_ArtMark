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

    async getPublicArtmarks() {
        const publicArtmarks = await Artmark.find({ isPublic: true}).lean();
        return publicArtmarks;
    },


    async addArtmark(userId, artmark) {
        artmark.userId = userId;
        const newArtmark = new Artmark(artmark);
        const artmarkObj = await newArtmark.save();
        return this.getArtmarkById(artmarkObj._id);
    },

    async getUserArtmarks(id) {
        const artmarks = await Artmark.find({ userid: id }).lean();
        return artmarks;
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
    },

    async updateArtmark(updatedArtmark) {
        const artmark = await Artmark.findOne({ _id: updatedArtmark._id });
        artmark.title = updatedArtmark.title;
        artmark.img = updatedArtmark.img;
        await artmark.save();
    },


};