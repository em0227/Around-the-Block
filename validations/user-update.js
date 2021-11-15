const Validator = require("validator");
const validText = require("./valid-text");
const User = require("../models/User");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.email = validText(data.email) ? data.email : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  User.findById(data.friends)
    .then((friend) => {})
    .catch((err) => {
      errors.friends = "Can not find this person";
    });

  // doesn't seem to do what is suppose to do, just show 'No user account found with that ID' msg if id not found

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
