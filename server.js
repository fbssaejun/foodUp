// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const userRoutes = require('./routes/userRoutes')
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Define Routes for each Resource
const usersRoutes = require("./routes/userRoutes");



//=============================
//==Routing for user / paths ==
//=============================
// Create a new instance of a router which will be used for user routes
const userRouter = express.Router();
// Pass this routers into userRoutes function which was imported from route/userRouter.js. This function will mutate userRouter object
// and mount it to routes defined in userROuter file. Object is mutated by reference, so return value does not need to be explicitly assigned
userRoutes(userRouter)
//Middleware assinged
app.use("/", userRouter);


// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/customer_menu", (req, res) => {
  res.render("customer_menu");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
