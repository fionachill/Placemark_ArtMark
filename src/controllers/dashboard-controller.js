import { db } from "../models/db.js";

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


  
};