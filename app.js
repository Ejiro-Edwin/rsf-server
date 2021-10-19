const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();
let app = express();

const emailRoute = require("./routes/email");

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ msg: "Welcome to the Email Notification Service." });
});

app.use(function (err, req, res, next) {
  res.status(500).send("Something wrong broke!");
  console.log(err);
});

app.use("/api/v1/email", emailRoute);

const port = process.env.PORT || 2000;
const server = app.listen(port, () => console.log(`app Running on ${port}`));

process.on("exit", () => server.close());
process.on("SIGTERM", () => server.close());
process.on("uncaughtException", () => server.close());

module.exports = app;
