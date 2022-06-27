const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const getProfileInfo = catchAsync(async (req, res) => {
  const user = req.user;
  const userProfile = {
    email:user.email,
    phone:user.phone,
    designation: user.designation,
    name: user.name
  };
  res.send({ message: "Profile", data: userProfile });
});

module.exports = {
  getProfileInfo,
};
