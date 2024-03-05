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
    artmarkid: {
        type: Schema.Types.ObjectId,
        ref: "Artmark",
    },
});

export const Artmark = Mongoose.model("Artmark", artmarkSchema);