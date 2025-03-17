const API_KEY = "this_is_my_secretekey";

const authMiddleware = (req, res, next) => {
  const apiKey = req.header("Authorization");
  try {
    if (apiKey.replace("Bearer ", "") !== API_KEY) {
      throw {
        success: false,
        message: "Not Autherized, invalid API key",
        statusCode: 403,
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
