import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { artmarkController } from "./controllers/artmark-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { reviewController } from "./controllers/review-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/about", config: aboutController.index },
    
  
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
    { method: "GET", path: "/adminlogin", config: adminController.showAdminLogin },
    
    { method: "GET", path: "/profile", config: accountsController.showProfile },
    { method: "POST", path: "/profile/{id}/update", config: accountsController.updateUser },
    { method: "GET", path: "/profile/{id}/delete", config: accountsController.deleteAccount },


    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "GET", path: "/dashboard/category", config: dashboardController.getArtmarkByCategory},
    { method: "GET", path: "/dashboard/deleteartmark/{id}", config: dashboardController.deleteArtmark },
    { method: "POST", path: "/dashboard/addartmark", config: dashboardController.addArtmark },

    { method: "GET", path: "/gallery", config: artmarkController.showPublicArtmarks },
    { method: "GET", path: "/gallery/{id}", config: artmarkController.showOnePublicArtmark },
    { method: "POST", path: "/gallery/{id}/addreview", config: artmarkController.addReview },
    { method: "GET", path: "/gallery/deletereview/{id}", config: reviewController.deleteReview },

    { method: "POST", path: "/authenticateAdmin", config: adminController.adminlogin },
    { method: "GET", path: "/admin", config: adminController.index },

    { method: "GET", path: "/artmark/{id}", config: artmarkController.index },
    { method: "POST", path: "/artmark/{id}/uploadimage", config: artmarkController.uploadImage },

    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false} },

];