// import { userMemStore } from "./mem/user-mem-store.js";
// import { artmarkMemStore } from "./mem/artmark-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { artmarkJsonStore } from "./json/artmark-json-store.js";

export const db = {
    userStore: null,
    artmarkStore: null,

    init() {
        this.userStore = userJsonStore;
        this.artmarkStore = artmarkJsonStore;
    },
};