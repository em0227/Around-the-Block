const validText = require("../validations/valid-text");

function isValidEvent(req, res, next) {
  const errors = {};
  let { name, description, location, time, imageUrl } = req.body;

  name = validText(name) ? name : "";
  description = validText(description) ? description : "";
  location = validText(location) ? location : "";
  time = validText(time) ? time : "";
  imageUrl = validText(imageUrl) ? imageUrl : "";

  if (name === "") {
    errors.name = "Name is required";
  }

  if (description === "") {
    errors.description = "Description is required";
  }

  if (description.length < 15) {
    errors.description = "Description must be longer";
  }

  if (location === "") {
    errors.location = "Location is required";
  }

  if (time === "") {
    errors.time = "Time is required";
  }

  if (imageUrl === "") {
    errors.imageUrl = "Image is required";
  }

  if (Object.values(errors).length > 0) {
    return res.status(422).json(errors);
  }

  next();
}
module.exports = { isValidEvent };
