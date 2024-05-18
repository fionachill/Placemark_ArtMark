import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
.keys({
    email: Joi.string().email().example("bilbo@theshire.com").required(),
    password: Joi.string().example("myprecious").required(),
}).label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Bilbo").required(),
    lastName: Joi.string().example("Baggins").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");



export const ArtmarkSpec = Joi.object()
    .keys({
    category: Joi.string().valid("Painting","Drawing","Sculpture","Monument","Street Art", "Architecture","Photography","Mixed Media","Textile").optional(),
    title: Joi.string().example("Luke Kelly Statue").required(), 
    artist: Joi.string().example("Vera Klute").required(), 
    description: Joi.string().example("A large marble sculpted head of Irish Folk Singer Luke Kelly").optional(), 
    location: Joi.string().example("Dublin").required(), 
    latitude: Joi.string().example("53.34061384439304").allow(""),
    longitude: Joi.string().example("-6.2633114754916015").allow(""),
    isPublic: Joi.string().valid("True", "False"),
    userid: IdSpec,
})
.label("Artmark");

export const ArtmarkSpecPlus = ArtmarkSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label(("ArtmarkPlus"));

export const ArtmarkArraySpec = Joi.array().items(ArtmarkSpecPlus).label("ArtmarkArray");

export const ReviewSpec = Joi.object().keys({
    reviewText: Joi.string().example("What lovely artwork").required(),
    userid: IdSpec,
    artmarkid: IdSpec,
}).label("Review");

export const JwtAuth = Joi.object()
.keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
})
.label("JwtAuth");