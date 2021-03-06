import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const Schema = mongoose.Schema;

const Event = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  dateOfEvent: {
    type: Date,
    required: true,
  },
  rounds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Round',
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
});

/**
 * Validate the data sent to create a event.
 * @param {Object} event
 * @returns {Promise} Promise-like object that
 * can be used as a promise, or as a simple object.
 *
 * To learn more you can head to:
 * https://github.com/hapijs/joi/blob/v13.1.2/API.md#validatevalue-schema-options-callback
 */
export function validateEvent(event) {
  const schema = Joi.object({
    name: Joi.string().required(),
    dateOfEvent: Joi.date().raw().required(),
    rounds: Joi.array(),
    createdBy: Joi.objectId(),
  }).options({ stripUnknown: true });

  return schema.validate(event);
}

export function validateUpdate(event) {
  const schema = Joi.object({
    name: Joi.string(),
    dateOfEvent: Joi.date(),
    rounds: Joi.array(),
  }).options({ stripUnknown: true });

  return schema.validate(event);
}

export default mongoose.model('Event', Event);
