import * as Joi from "joi";

export const ItemSchema = Joi.object().keys({
    description: Joi.string().max(255).required(),
    status: Joi.bool().required(),
    dueDate: Joi.date().required()
})

export const ItemPatchSchema = Joi.object().keys({
    description: Joi.string().max(255),
    status: Joi.bool(),
    dueDate: Joi.date()
})

