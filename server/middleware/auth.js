const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;

    console.log(access_token);
    if (!access_token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let decode = verifyToken(access_token);

    let user = await User.findByPk(decode.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: user.id, email: user.email };

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = authentication;
