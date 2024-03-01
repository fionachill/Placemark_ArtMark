// eslint-disable-next-line import/no-unresolved
import { db } from "../models/db.js";


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

    addArtmark: {
        handler: async function ( request, h) {
            const loggedInUser = request.auth.credentials;
            const newArtmark = {
                userid: loggedInUser._id,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
                title: request.payload.title,
                artist: request.payload.artist,
                medium: request.payload.medium,
            };
            await db.artmarkStore.addArtmark(newArtmark);
            return h.redirect("/dashboard");
        },
    },

    deleteArtmark: {
        handler: async function (request, h) {
            const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
            await db.artmarkStore.deleteArtmark(artmark._id);
            return h.redirect("/dashboard");
        },
    },

};