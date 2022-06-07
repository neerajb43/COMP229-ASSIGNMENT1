let express = require("express");
let path = require("path");
let logger = require("morgan");

let mainRoute = require("./routes/index");

let app = express();
let PORT = procecss.env.PORT || 3000;

// For viewing the engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// For the middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//For using the static files
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./node_modules")));

//For the routes
app.use("/", mainRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
