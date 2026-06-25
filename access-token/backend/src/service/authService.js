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
    const { email, username, password } = data;

    if ((!email && !username) || !password) {
      throw new Error("All fields are required");
    }

    const user = await UserModel.findOne({
      $or: [
        { email: email || "" },
        { username: username || "" }
      ]
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user
    };
  } catch (err) {
    throw new Error(err.message);
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
