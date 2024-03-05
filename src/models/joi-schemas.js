import Joi from "joi";

export const UserSpec = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const ArtmarkSpec = {
    category: Joi.string(),
    title: Joi.string().required(), 
    artist: Joi.string().required(), 
    description: Joi.string().required(), 
    location: Joi.string().required(), 
    latitude: Joi.number(),
    longitude: Joi.number(),
    access: Joi.string(),
};
