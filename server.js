let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
//const dotenv = require("dotenv");
//dotenv.config({ path: "config.env" });
let logger = require("morgan");
let session = require("express-session");
let passport = require("passport");
const flash = require("connect-flash");

//passport config
require("./config/passport")(passport);

//Application init
let app = express();
let PORT = process.env.PORT || 3000;


// database setup in the application
var configDB = require('./config/db');
var db = configDB();


let mainRoute = require("./routes/index");
let userRoute = require("./routes/users");


// view template engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// For the middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//body parser
app.use(express.urlencoded({ extended: false }));

//express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(logger("dev"));
app.use(express.json());

app.use(flash());

//passport session middleware
app.use(passport.initialize());
app.use(passport.session());

//declare global variables for color for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//For using the static files
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./node_modules")));
app.use(
  "/dashboard/css",
  express.static(path.resolve(__dirname, "assets/css"))
);
app.use(
  "/dashboard/javascripts",
  express.static(path.resolve(__dirname, "./public"))
);
app.use("/dashboard", express.static(path.resolve(__dirname, "./public")));
app.use("/users", express.static(path.resolve(__dirname, "./public")));
app.use("/dashboard", express.static(path.join(__dirname, "./node_modules")));
app.use("/users", express.static(path.join(__dirname, "./node_modules")));

//For the routes
app.use("/", mainRoute);
app.use("/user", userRoute);
app.use("/dashboard", require("./routes/contact"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
