import * as Joi from "joi";

export const UserSchema = Joi.object().keys({
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
})