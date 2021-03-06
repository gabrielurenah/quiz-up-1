import moongose from 'mongoose';
import Joi from '@hapi/joi';

const Schema = moongose.Schema;

const Team = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  residents: [
    {
      type: String,
      required: true,
    },
  ],
  medicalCenter: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

/**
 * Validate the data sent to create a team.
 * @param {Object} team
 * @returns {Promise} Promise-like object that
 * can be used as a promise, or as a simple object.
 *
 * To learn more you can head to:
 * https://github.com/hapijs/joi/blob/v13.1.2/API.md#validatevalue-schema-options-callback
 */
export function validateTeam(team) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    residents: Joi.array(),
    medicalCenter: Joi.string().required(),
    createdBy: Joi.objectId(),
  }).options({ stripUnknown: true });

  return schema.validate(team);
}

export function validateForUpdate(team) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255),
    residents: Joi.array(),
    medicalCenter: Joi.string(),
    createdBy: Joi.objectId(),
  }).options({ stripUnknown: true });

  return schema.validate(team);
}

export default moongose.model('Team', Team);
