const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const moment = require("moment");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate token
 * @param {ObjectId} accountId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (account, expires, type, secret = config.jwt.secret) => {
  const payload = {
    email: account.email,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
    name: account.name,
    designation: account.designation,
    phone: account.phone,
  };
  return jwt.sign(payload, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 */
 const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    return payload;
  };
  
  /**
   * @param {string} token
   */
  const decodeToken = async (token) => {
    const payload = jwt.verify(token, config.jwt.secret);
    return payload;
  };

  /**
 * Generate auth tokens
 * @param {Account} account
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (account) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    account,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};
module.exports = {generateToken, verifyToken, decodeToken, generateAuthTokens};