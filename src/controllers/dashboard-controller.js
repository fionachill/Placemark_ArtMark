import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const artmarks = await db.artmarkStore.getAllArtmarks();
      const viewData = {
        title: "ArtMarks Dashboard",
         artmarks: artmarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addArtmark: {
    handler: async function (request, h) {
      const newArtmark = {
        title: request.payload.title,
      };
      await db.artmarkStore.addArtmark(newArtmark);
      return h.redirect("/dashboard");
    },
  },
};