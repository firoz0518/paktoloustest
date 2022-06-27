const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/tokens");

const loginAccountWithEmailAndPassword = async (body) => {
  const { email, password } = body;
  if (email == "firozkhan.518@gmail.com" && password == "firoz@123") {
    const account = {
      email: "firozkhan.518@gmail.com",
      name: "firoz khan P",
      designation: "NodeJS Developer",
      phone: "919493225232",
    };
    return account;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect email or password");
  }
};

module.exports = {
  loginAccountWithEmailAndPassword,
};
