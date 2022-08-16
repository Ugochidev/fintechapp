const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);
const db = require("./db/db");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const sessionStore = new KnexStore({ knex: db });
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// Set Security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import all routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

//default Route
app.get("/", (req, res) => {
  res.send("Hello world");
});
const { PORT } = process.env;

//   Routes Middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.listen(PORT, async () => {
  console.log(`The app is listening on PORT ${PORT}`);
});

module.exports = app;
