const authServices = require("../services/auth.services");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { successResMsg, errorResMsg } = require("../utils/response");



const createSendToken = async (user, statusCode, res) => {
  const secret_key = process.env.JWT_TOKEN;
  const data = {
    email: user.email,
  };
  const token = await jwt.sign(data, secret_key);
  const cookieOptions = {
    expires: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  const dataInfo = {
    message: `Hi ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()}, Welcome Back`,
    token,
  };
  return res.status(200).json({
    dataInfo,
  });
};
const register = async (req, res) => {
  try {
    // console.log("olpllk", req.body);
    const user = await authServices.createUser(req.body);
    // console.log(user);
    // if (!user) {
    //   throw new AppError("Please fill all required fields", 400);
    // }

    const dataInfo = {
      message: "User created successfully",
    };
    return successResMsg(res, 201, dataInfo);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authServices.login(req.body);
    console.log("ytyty", result);
    createSendToken(result[0], 200, res);

  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

module.exports = { register, login };
