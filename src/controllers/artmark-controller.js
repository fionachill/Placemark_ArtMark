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


};