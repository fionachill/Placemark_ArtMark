import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { artmarkController } from "./controllers/artmark-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/gallery", config: artmarkController.showPublicArtmarks },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
    { method: "GET", path: "/adminlogin", config: adminController.showAdminLogin },
    
    { method: "GET", path: "/profile", config: accountsController.showProfile },
    { method: "POST", path: "/profile/{id}/update", config: accountsController.updateProfile },
    { method: "GET", path: "/profile/delete/{id}", config: accountsController.deleteAccount },
    { method: "GET", path: "/about", config: aboutController.index },

    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "GET", path: "/dashboard/deleteartmark/{id}", config: dashboardController.deleteArtmark },
    { method: "POST", path: "/dashboard/addartmark", config: dashboardController.addArtmark },

    { method: "POST", path: "/authenticateAdmin", config: adminController.adminlogin },
    { method: "GET", path: "/admin", config: adminController.index },

    { method: "GET", path: "/artmark/{id}", config: artmarkController.index },
    { method: "POST", path: "/artmark/{id}/uploadimage", config: artmarkController.uploadImage },

    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false} },

];