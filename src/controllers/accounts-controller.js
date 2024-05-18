import { db } from "../models/db.js";
import { UserCredentialsSpec, UserSpec, UserSpecPlus } from "../models/joi-schemas.js"
import { userMongoStore } from "../models/mongo/user-mongo-store.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to ArtMarks" });
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for ArtMarks" });
    },
  },
  
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error ) {
        return h.view("signup-view", {title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },


  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to ArtMarks" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error ) {
        return h.view("login-view", {title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
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

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  showProfile: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      console.log(user);
      const viewData = {
        title: "Profile",
        user: user,
      }
      return h.view("profile-view", viewData);
    },
  },

  updateUser: {
    auth: false,
    validate: {
      payload: UserSpecPlus,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("profile-view", { title: "Update Profile error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const userId = await db.userStore.getUserById(request.params.id);
      const updatedUser = request.payload;
      await db.userStore.updateUser(userId, updatedUser)
      return h.redirect("/dashboard");
      },
  },

// Functionality for user to delete own account. Not working

  deleteAccount: {
    auth: false,
    handler: async function (request, h) {
      const userId = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(userId._id);
      console.log(`Deleting user: ${  user.email}` );
      return h.redirect("/");  
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

};