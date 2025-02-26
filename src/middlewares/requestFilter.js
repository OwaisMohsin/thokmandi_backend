const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

exports.checkRequest = async (req, res, next) => {
  let token;

  // Get token from the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    token = req.headers.authorization.split(" ")[1];
  }

  // If token is missing, respond with 401 status
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Token is missing from request header" });
  }

  try {
    // Verify token and decode the payload
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Find the user by the ID stored in the token
    const requestUser = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        id:true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    // If the user no longer exists, respond with 404 status
    if (!requestUser) {
      return res.status(404).json({
        status: false,
        message: "User with that token no longer exists",
      });
    }

    // If all checks pass, attach the user id to the request and move to the next middleware
    req.user = requestUser;
    next();
  } catch (error) {
    // Handle specific token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token has expired. Please log in again.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ status: false, message: "Invalid token. Access denied." });
    } else {
      // Handle any other errors
      console.error("Unexpected error:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred during authentication.",
      });
    }
  }
};
