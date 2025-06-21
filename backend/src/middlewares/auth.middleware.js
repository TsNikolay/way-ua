import tokenService from "../services/token.service.js";

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format." });
    }

    const token = tokenParts[1];
    const userData = await tokenService.validateAccessToken(token);

    if (!userData) {
      return res.status(401).json({ message: "Token not valid." });
    }

    req.user = userData;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token check failed." });
  }
};
