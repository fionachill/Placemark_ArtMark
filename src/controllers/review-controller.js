import { db } from "../models/db.js";
import { ReviewSpec } from "../models/joi-schemas.js";

export const reviewController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const review = await db.reviewStore.getReviewById(request.params.id);
            const viewData = {
                title: "Edit Review",
                user: loggedInUser,
                review: review,
            };
            return h.view("review-view", viewData);   
        },
    },

    updateReview: {
        validate: {
            payload: ReviewSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("review-view", {title: "Error updating review", errors: error.details}).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const review = await db.reviewStore.getReviewById(request.params.id);
            const updatedReview = {
                reviewText: request.payload.reviewText,
            };
            await db.reviewStore.updateReview(review._id, updatedReview);
            return h.redirect("/dashboard");
        },
    },

    deleteReview: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const artmark = await db.artmarkStore.getArtmarkById(request.params.id);
            const review = await db.reviewStore.getReviewById(request.params.id);
            if (loggedInUser._id !== review.userId) {
                console.log("You cannot delete reviews that you did not create")
                return h.redirect("/gallery");
            }
            await db.reviewStore.deleteReview(review._id);
            return h.redirect(`/gallery/${artmark._id}`);  
        },
    },

};