import Joi from "joi";

export const createVenueSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  building: Joi.string().trim().min(1).max(50).required(),
  room: Joi.string().trim().min(1).max(30).required(),
  capacity: Joi.number().integer().min(1).max(10000).required(),
  notes: Joi.string().trim().max(500).optional(),
}).required();

export const updateVenueSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  building: Joi.string().trim().min(1).max(50).optional(),
  room: Joi.string().trim().min(1).max(30).optional(),
  capacity: Joi.number().integer().min(1).max(10000).optional(),
  notes: Joi.string().trim().max(500).optional(),
})
  .min(1)
  .required();