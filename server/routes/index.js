const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middleware/auth");
const router = express.Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { createToken } = require("../helpers/jwt");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/movies", Controller.readAllMovies);
router.get("/movies/:id", Controller.detailMovie);
router.post("/google-login", async (req, res) => {
  try {
    let { credential } = req.headers;
    console.log(credential);
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    console.log(ticket);
    const payload = ticket.getPayload();
    console.log(payload, "<<<<dipayload");

    const [user, isCreated] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        email: payload.email,
        password: String(Math.random() * 1000),
        role: "customer",
      },
      hooks: false,
    });
    console.log(user, "<<<diuser");
    const access_token = createToken({ id: user.id });
    res.status(200).json({ access_token, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Token" });
  }
});

router.use(authentication);
router.get("/wishlist", Controller.getWishlist);
router.post("/wishlist", Controller.addWishlist);
router.put("/wishlist/:id", Controller.updateWishlist);
// router.get("/mymovies", Controller.getMyMovies);
router.post("/payment", Controller.sendPayment);

module.exports = router;
