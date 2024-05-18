import { userMemStore } from "./mem/user-mem-store.js";
import { artmarkMemStore } from "./mem/artmark-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { artmarkJsonStore } from "./json/artmark-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { artmarkMongoStore } from "./mongo/artmark-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";

export const db = {
    userStore: null,
    artmarkStore: null,
    reviewStore: null,

    init(storeType) {
        switch (storeType) {
            case "json":
                this.userStore = userJsonStore;
                this.artmarkStore = artmarkJsonStore;
                break;
            case "mongo":
                this.userStore = userMongoStore;
                this.artmarkStore = artmarkMongoStore;
                this.reviewStore = reviewMongoStore;
                connectMongo();
                break;
            default:
                this.userStore = userMemStore;
                this.artmarkStore = artmarkMemStore;
        }
    }
};