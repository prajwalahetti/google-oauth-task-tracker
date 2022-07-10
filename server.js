const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

// load config
dotenv.config({ path: "./config/.env" });

// passport config
require("./config/passport")(passport);
connectDB();

const app = express();
app.use(express.json({ extended: false }));

// logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// express session
app.use(
  session({
    name: "session",
    secret: process.env.PASSPORT_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { originalMaxAge: 1000 * 60 * 60 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
