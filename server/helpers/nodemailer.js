const nodemailer = require("nodemailer");

const moviePurchased = (email, movietitle) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "golearnjs@gmail.com",
      pass: "mnzdttvdnxdmyqnr",
    },
  });

  let mailOptions = {
    from: "golearnjs@gmail.com",
    to: email,
    subject: "Movie Purchased",
    text: `You purchased movie with title ${movietitle}, thank you for your payment`,
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("Email sent: " + info.response);
  });
};

module.exports = { moviePurchased };
