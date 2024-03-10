import { db } from "../models/db.js";
import { ArtmarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const artmarks = await db.artmarkStore.getUserArtmarks(loggedInUser._id);
      const viewData = {
        title: "ArtMarks Dashboard",
        user: loggedInUser,
        artmarks: artmarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addArtmark: {
    validate: {
      payload: ArtmarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error ) {
        return h.view("dashboard-view", {title: "Add Artmark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function ( request, h) {
        const loggedInUser = request.auth.credentials;
        const newArtmark = {
            userid: loggedInUser._id,
            category: request.payload.category,
            title: request.payload.title,
            artist: request.payload.artist,
            description: request.payload.description,
            location: request.payload.location,
            latitude: request.payload.latitude,
            longitude: request.payload.longitude,
            access: request.payload.access,
        };
        await db.artmarkStore.addArtmark(newArtmark);
        return h.redirect("/dashboard");
    },
},

deleteArtmark: {
    handler: async function (request, h) {
        const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
        await db.artmarkStore.deleteArtmarkById(artmark._id);
        return h.redirect("/dashboard");
    },
},


  
};