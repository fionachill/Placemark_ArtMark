import Mongoose from "mongoose";
import Boom from "@hapi/boom";
import validator from "validator";

const { Schema } = Mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    admin: { 
        type: Boolean, 
        default: false 
    }
});

export const User = Mongoose.model("User", userSchema);