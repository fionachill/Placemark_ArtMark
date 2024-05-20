import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    reviewText: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    artmarkId: {
        type: Schema.Types.ObjectId,
        ref: "Artmark",
    },   
    }, {timestamps: true});

export const Review = Mongoose.model("Review", reviewSchema);
