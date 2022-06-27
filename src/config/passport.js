const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const {tokenTypes} = require("./tokens");
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.exp < new Date().getTime() / 1000) {
      throw new Error("Token expired");
    }

    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    done(null, payload);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
