import { db } from "../models/db.js";
import { UserCredentialsSpec, UserSpec } from "../models/joi-schemas.js"
import { userMongoStore } from "../models/mongo/user-mongo-store.js";

export const adminController = {
    index: {
        handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          const artmarks = await db.artmarkStore.getAllArtmarks();
          const users = await db.userStore.getAllUsers();
          const viewData = {
            title: "Admin Dashboard",
            users: users,
            artmarks: artmarks,
          };
          return h.view("admin-dashboard-view", viewData);
        },
    },

    showAdminLogin: {
        auth: false,
        handler: function (request, h) {
          return h.view("admin-login", { title: "Admin login" });
        },
      },

      adminlogin: {
        auth: false,
        validate: {
          payload: UserCredentialsSpec,
          options: { abortEarly: false },
          failAction: function (request, h, error ) {
            return h.redirect("/", {title: "Log in error", errors: error.details }).takeover().code;
          },
        },
        handler: async function (request, h) {
          const { email, password } = request.payload;
          const user = await db.userStore.getUserByEmail(email);
          if (!user || user.password !== password) {
              return h.redirect("/");
            }
          if ( user.admin !== true ) {
              return h.redirect("/");
          } 
          request.cookieAuth.set({ id: user._id });
          return h.redirect("/admin");
          }
        },
    


}