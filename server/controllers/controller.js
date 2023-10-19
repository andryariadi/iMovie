const { User, Wishlist } = require("../models");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const midtransClient = require("midtrans-client");
const { moviePurchased } = require("../helpers/nodemailer");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res) {
    try {
      let { email, password } = req.body;

      let user = await User.create({ email, password });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      console.log(err);
      if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async login(req, res) {
    try {
      let { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      let user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      let isPassword = bcrypt.compareSync(password, user.password);
      if (!isPassword) {
        return res.status(401).json({ message: "Invalid email/password" });
      }

      let access_token = createToken({ id: user.id });
      res.status(200).json({ access_token, role: user.role });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async readAllMovies(req, res) {
    try {
      let { query, page, filter } = req.query;
      console.log(req.query, "<<<<<<queryyyy");
      console.log(query.length, "<<<<<<typeoffffff");
      let options = {};
      if (query.length === 0 && filter.populer !== "true" && filter.toprated !== "true") {
        options = {
          url: "https://api.themoviedb.org/3/movie/now_playing",
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTJlNzY3NTUxM2NmNmQ2YjI0NzI0ZDU3NDFjN2ZiYiIsInN1YiI6IjY0ZWRmOTk0NTI1OGFlMDBhZGQ2MzMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ef1n2MBr1qQmm1LaD1v90g7DIb_avMI6Nkfqnp_woes",
          },
          params: {
            page: page,
            language: "en-US",
          },
        };
      } else if (filter.populer === "true") {
        options = {
          url: `https://api.themoviedb.org/3/movie/popular`,
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTJlNzY3NTUxM2NmNmQ2YjI0NzI0ZDU3NDFjN2ZiYiIsInN1YiI6IjY0ZWRmOTk0NTI1OGFlMDBhZGQ2MzMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ef1n2MBr1qQmm1LaD1v90g7DIb_avMI6Nkfqnp_woes",
          },
          params: { language: "en-US", page: page },
        };
      } else if (filter.toprated === "true") {
        options = {
          url: `https://api.themoviedb.org/3/movie/top_rated`,
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTJlNzY3NTUxM2NmNmQ2YjI0NzI0ZDU3NDFjN2ZiYiIsInN1YiI6IjY0ZWRmOTk0NTI1OGFlMDBhZGQ2MzMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ef1n2MBr1qQmm1LaD1v90g7DIb_avMI6Nkfqnp_woes",
          },
          params: { language: "en-US", page: page },
        };
      } else {
        options = {
          url: `https://api.themoviedb.org/3/search/movie`,
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTJlNzY3NTUxM2NmNmQ2YjI0NzI0ZDU3NDFjN2ZiYiIsInN1YiI6IjY0ZWRmOTk0NTI1OGFlMDBhZGQ2MzMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ef1n2MBr1qQmm1LaD1v90g7DIb_avMI6Nkfqnp_woes",
          },
          params: { query: query, include_adult: false, language: "en-US", page: page },
        };
      }
      console.log(options, "<<<<<<dioptoinssss");
      let { data } = await axios(options);
      let movies = data.results.map((e) => {
        return {
          id: e.id,
          title: e.title,
          description: e.overview,
          imgUrl: "https://image.tmdb.org/t/p/original" + e.poster_path,
          price: 50000,
        };
      });
      res.status(200).json(movies);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async detailMovie(req, res) {
    try {
      let { id } = req.params;
      let { data } = await axios({
        url: `https://api.themoviedb.org/3/movie/${id}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.MOVIE_TOKEN}`,
        },
      });
      const movie = {
        id: data.id,
        title: data.original_title,
        description: data.overview,
        imgUrl: "https://image.tmdb.org/t/p/original" + data.poster_path,
        price: 50000,
      };
      res.status(200).json(movie);
      console.log(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addWishlist(req, res) {
    try {
      const { title, description, imgUrl, price } = req.body;
      await Wishlist.create({ UserId: req.user.id, title, description, imgUrl, price });
      res.status(201).json({ message: "Wishlist created successfully" });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async sendPayment(req, res) {
    try {
      const { amount } = req.body;

      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY_ANDRY,
      });

      const parameter = {
        transaction_details: {
          order_id: "IMOVIE" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getWishlist(req, res) {
    try {
      const data = await Wishlist.findAll();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateWishlist(req, res) {
    try {
      const { id } = req.params;
      const data = await Wishlist.findByPk(id);
      await Wishlist.update({ status: true }, { where: { id } });
      moviePurchased(req.user.email, data.title);
      res.status(201).json({ message: `wishlist with ${id} updated` });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // static async getMyMovies(req, res) {
  //   try {
  //     const data = await Wishlist.findAll({ where: { status: true } });
  //     res.status(200).json(data);
  //   } catch (err) {
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }
}

module.exports = Controller;
