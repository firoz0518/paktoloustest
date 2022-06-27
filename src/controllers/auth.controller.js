const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  tokenService
} = require("../services");

const login = catchAsync(async (req, res) => {
  const account = await authService.loginAccountWithEmailAndPassword(req.body);
  const tokens = await tokenService.generateAuthTokens(account);
  res.send({ message: "Login successful", data: tokens });
});

module.exports = {
  login
};
