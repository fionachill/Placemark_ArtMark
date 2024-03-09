// eslint-disable-next-line import/no-unresolved
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";


export const artmarkController = {
    index: {
        handler: async function (request, h) {
            const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
            const viewData = {
                title: "Artmark",
                artmark: artmark,
            };
            console.log("viewData:", viewData);
            return h.view("artmark-view", viewData);
        },
    },

    uploadImage: {
        handler: async function (request, h) {
            try {
                const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    artmark.img = url;
                    await db.artmarkStore.updateArtmark(artmark);
                }
                return h.redirect(`/artmark/${artmark._id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/artmark/${artmark._id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    

};