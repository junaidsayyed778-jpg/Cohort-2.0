const {
  registerService,
  loginService,
  getAccessTokenService,
} = require("../service/authService");

const registerController = async (req, res) => {
  const { accessToken, refreshToken, newUser } = await registerService(
    req.body,
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 10 * 60 * 1000,
  });

  return res.status(201).json({
    message: "User register successully",
    user: newUser,
  });
};

const loginController = async (req, res) => {
  const { accessToken, refreshToken, user } =
    await loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User loginIn",
    user,
    accessToken,
    refreshToken,
  });
};
const getAccessTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({
        message: "Unathorized request",
      });

    const accessToken = await getAccessTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 10 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Access token generated",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getAccessTokenController,
};
