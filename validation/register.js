const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let { name, password, email } = data;
  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  // Name rules
  if (!name) {
    errors.name = "Name is required.";
  } else {
    if (!Validator.isLength(name, { min: 2, max: 30 })) {
      errors.name = "Username should be between 2 and 30 characters.";
    }
  }

  // Email rules
  if (!email) {
    errors.email = "Email is required.";
  } else {
    if (!Validator.isEmail(email)) {
      errors.email = "Email is invalid.";
    }
  }

  // Password rules
  if (!password) {
    errors.password = "Password is required";
  } else {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password should be between 6 and 30 characters.";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
