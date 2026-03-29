const Joi = require('joi');

const createSubscriptionSchema = Joi.object({
  // user_id: Joi.string().uuid().required(),
  route_id: Joi.string().uuid().required(),
  plan_id: Joi.string().uuid().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),

  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
});

module.exports = { createSubscriptionSchema };