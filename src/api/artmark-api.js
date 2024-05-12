import Boom from "@hapi/boom";
import { ArtmarkSpec, ArtmarkSpecPlus, ArtmarkArraySpec, IdSpec } from "../models/joi-schemas.js"
import { db } from "../models/db.js";
import { validationError } from "./logger.js";


export const artmarkApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const artmarks = await db.artmarkStore.getAllArtmarks();
                return artmarks;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all Artmarks",
        notes: "Returns details of all artmarks",
        response: { schema: ArtmarkArraySpec, failAction: validationError },
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        async handler(request) {
            try {
                const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
                if (!artmark) {
                    return Boom.notFound("No Artmark with this id");
                }
                return artmark;
            } catch (err) {
                return Boom.serverUnavailable("No Artmark with this id");
            }
        },
        tags: ["api"],
        description: "Find one artmark",
        notes: "Returns a specific artmark",
        validate: { params: {id: IdSpec }, failAction: validationError },
        response: { schema: ArtmarkSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const artmark = request.payload;
                const newArtmark = await db.artmarkStore.addArtmark(artmark);
                if (newArtmark) {
                    return h.response(newArtmark).code(201);
                }
                return Boom.badImplementation("Error creating artmark");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create an Artmark",
        notes: "Returns the newly created artmark",
        validate: { payload: ArtmarkSpec, failAction: validationError },
        response: { schema: ArtmarkSpecPlus, failAction: validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
                if (!artmark) {
                    return Boom.notFound("No Artmark with this id");
                }
                await db.artmarkStore.deleteArtmarkById(artmark._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Artmark with this id");
            }
        },
        tags: ["api"],
        description: "Delete an artmark",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.artmarkStore.deleteAllArtmarks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all artmarkApi",
        notes: "All artmarkApi removed from Artmark",
    },
};