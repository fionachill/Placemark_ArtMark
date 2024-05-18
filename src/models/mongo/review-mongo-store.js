import { Review } from "./review.js";

export const reviewMongoStore = {

    async getReviewsByUserId(id) {
        const reviews = await Review.find({ userId: id}).lean();
        return reviews;
    },

    async getReviewsByArtmarkId(id) {
        const reviews = await Review.find({ artmarkId: id}).lean();
        return reviews;
    },

    async getReviewById(id) {
        if (id) {
            const review = await Review.findOne({ _id: id}).lean();
            return review;
        }
        return null;
    },

    async addReview(userId, artmarkId, review) {
        review.userid = userId;
        review.artmarkId = artmarkId;
        const newReview = new Review(review);
        const reviewObj = await newReview.save();
        return this.getReviewById(reviewObj._id);
    },

    async deleteReview(id) {
        try { 
            await Review.deleteOne({ _id: id});
        } catch (error) {
            console.log("Review not deleted, invalid id");
        }
    },

    async deleteAllReviews() {
        await Review.deleteMany({});
    },

    async updateReview(review, updatedReview) {
        const oldReview = await Review.findOne({ _id: review._id});
        oldReview.reviewText = updatedReview.reviewText;
        await oldReview.save();
    },
};