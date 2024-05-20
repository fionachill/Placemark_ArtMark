import Boom from "@hapi/boom";
import { ArtmarkSpec, ArtmarkSpecPlus, IdSpec, ReviewSpec, ReviewArraySpec } from "../models/joi-schemas.js"
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const reviewApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const reviews = await db.reviewStore.getReviews();
                return reviews;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all Reviews",
        notes: "Returns details of all reviews",
        response: { schema: ReviewArraySpec, failAction: validationError },
    },
}