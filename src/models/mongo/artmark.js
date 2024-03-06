import Mongoose from "mongoose";

const { Schema } = Mongoose;

const artmarkSchema = new Schema({
    category: String,
    title: String, 
    artist: String,
    description: String,
    location: String,
    latitude: Number,
    longitude: Number,
    access: String,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const Artmark = Mongoose.model("Artmark", artmarkSchema);