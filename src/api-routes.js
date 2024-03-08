import { artmarkApi } from "./api/artmark-api.js";
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne} ,
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

    { method: "POST", path: "/api/artmarks", config: artmarkApi.create },
    { method: "DELETE", path: "/api/artmarks", config: artmarkApi.deleteAll },
    { method: "GET", path: "/api/artmarks", config: artmarkApi.find },
    { method: "GET", path: "/api/artmarks/{id}", config: artmarkApi.findOne },
    { method: "DELETE", path: "/api/artmarks/{id}", config: artmarkApi.deleteOne },
        
];