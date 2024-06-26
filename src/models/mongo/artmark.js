import Mongoose from "mongoose";

const { Schema } = Mongoose;

const artmarkSchema = new Schema({
    category: String,
    title: String,
    img: String, 
    artist: String,
    description: String,
    location: String,
    latitude: String,
    longitude: String,
    isPublic: Boolean,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const Artmark = Mongoose.model("Artmark", artmarkSchema);