import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      // const artmarks = await db.playlistStore.getAllPlaylists();
      const viewData = {
        title: "ArtMarks Dashboard",
        // playlists: playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

/*  add: {
    handler: async function (request, h) {
      const newPlayList = {
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlayList);
      return h.redirect("/dashboard");
    },
  }, */
};