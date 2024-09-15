import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    console.log("No authorization Header");
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }
  try {
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token Format",
      });
    }

    const decode = jwt.decode(token, process.env.SECRET_KEY);
    req.decoded = decode;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Session Expired",
        error: error.message,
      });
    }
    if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: error.message,
      stack: error.stack,
    });
    console.log(error);
  }
};

export default auth;
