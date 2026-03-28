const Joi = require('joi');

exports.createPostSchema = Joi.object({
  title:   Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
});

exports.updatePostSchema = Joi.object({
  title:   Joi.string().min(3).max(100),
  content: Joi.string().min(10),
}).min(1); 