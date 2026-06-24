const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken.js");
const UserModel = require("../models/userModel.js");

const registerService = async (data) => {
  try {
    const { name, email, password } = data;

    if (!email || !password) throw new Error("all fields are required");

    const isExisted = await UserModel.findOne({
      email,
    });

    if (isExisted) throw new Error("User already exists with this email");

    let hashPass = bcrypt.hashSync(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return {
      accessToken,
      refreshToken,
      newUser,
    };
  } catch (err) {
    throw new Error(error);
  }
};

const loginService = async (data) => {
  try {
    const { email, password } = data;

    if ((!email, !password))
      return res.status(400).json({
        message: "All fields are required",
      });

    const isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found",
      });

    const hashPass = await bcrypt.compare(password, isExisted.password);

    if (!hashPass)
      return res.status(401).json({
        message: "Invalid credentials",
      });

    let accessToken = generateAccessToken(isExisted._id);
    let refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return {
      accessToken,
      refreshToken,
      isExisted,
    };
  } catch (err) {
    throw new Error(error);
  }
};

const getAccessTokenService = async (data) => {
  const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
  if (!decode) throw new Error("unauthorized");

  const user = await UserModel.findById(decode.id);

  if (refreshToken !== user.refreshToken) throw new Error("unauthorized");

  const accessToken = generateAccessToken(user._id);

  return accessToken;
};
module.exports = {
  registerService,
  loginService,
  getAccessTokenService,
};
