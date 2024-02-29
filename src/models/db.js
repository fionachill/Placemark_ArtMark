// eslint-disable-next-line import/no-unresolved
import { userMemStore } from "./mem/user-mem-store.js";
import { artmarkMemStore } from "./mem/artmark-mem-store.js";

export const db = {
    userStore: null,
    artmarkStore: null,

    init() {
        this.userStore = userMemStore;
        this.artmarkStore = artmarkMemStore;
    },
};