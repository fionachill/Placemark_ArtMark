import { db } from "../models/db.js";
import { ArtmarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const artmarks = await db.artmarkStore.getUserArtmarks(loggedInUser._id);
      console.log("successfully logged in user: ", loggedInUser.firstName);
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
      failAction: async function (request, h, error ) {
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
            isPublic: request.payload.access,
        };
        await db.artmarkStore.addArtmark(loggedInUser._id, newArtmark);
        return h.redirect("/dashboard");
    },
},

getArtmarkByCategory: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    // eslint-disable-next-line prefer-destructuring
    const category = request.params.category;
    const artmarks = await db.artmarkStore.getArtmarksByCategory(loggedInUser._id, category);
    const viewData = {
      title: "ArtMarks Dashboard",
      user: loggedInUser,
      artmarks: artmarks,
    };
    return h.view("dashboard-view", viewData);
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