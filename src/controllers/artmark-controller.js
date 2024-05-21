// eslint-disable-next-line import/no-unresolved
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { ReviewSpec } from "../models/joi-schemas.js";


export const artmarkController = {
    index: {
        handler: async function (request, h) {
            const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
            const viewData = {
                title: "Artmark",
                artmark: artmark,
            };
            console.log("viewData:", viewData);
            return h.view("artmark-view", viewData);
        },
    },

    showPublicArtmarks: {
        auth: false,
        handler: async function (request, h) {
            const artmarks = await db.artmarkStore.getPublicArtmarks();
            const viewData = {
                title: "Artmark Gallery",
                artmarks: artmarks,
            };
            console.log("public artmarks coming up");
            return h.view("public-gallery-view", viewData);
        },
    },

    showOnePublicArtmark: {
        auth: false,
        handler: async function (request, h) {
            const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
            const reviews = await db.reviewStore.getReviewsByArtmarkId(artmark._id);
            const viewData = {
                title: "Artmark",
                artmark: artmark,
                reviews: reviews,
            };
            return h.view("public-artmark-view", viewData);
        },
    },

    addReview: {
        validate: {
            payload: ReviewSpec,
            options: { abortEarly: false},
            failAction: async function (request, h, error){
                return h.view("public-artmark-view", {title: "Error adding review", errors: error.details}).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
            const newReview = {
                reviewText: request.payload.reviewText,
            };
            await db.reviewStore.addReview(loggedInUser._id, artmark._id, newReview);
            console.log("adding review to artmark");
            return h.redirect(`/gallery/${artmark._id}`);
        },

    },

    

    uploadImage: {
        handler: async function (request, h) {
            try {
                const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    artmark.img = url;
                    await db.artmarkStore.updateArtmark(artmark);
                }
                return h.redirect("/dashboard");
            } catch (err) {
                console.log(err);
                return h.redirect("/dashboard");
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    

};