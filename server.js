// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
// Define a source for Routes to Mount for each Resource
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

//Test Route
const testRoutes = require("./routes/testRoutes");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//===============================================================================================================================
//=================================================    Routing for user / paths     =============================================
//===============================================================================================================================
// Create a new instance of a router which will be used for OWNER routes
const ownerRouter = express.Router();
// Pass this routers into ownerRoutes function which was imported from route/ownerRouter.js. This function will mutate ownerRouter object
// and mount it to routes defined in ownerRouter file. Object is mutated by reference, so return value does not need to be explicitly assigned.
ownerRoutes(ownerRouter);
//Middleware assinged
app.use("/admin", ownerRouter);

//=================================================================================================================================================
//=================================================    Routing for test/ paths  !!!FOR TEST ONLY!!!   =============================================
//=================================================================================================================================================
// Create a new instance of a router which will be used for OWNER routes
const testRouter = express.Router();
// Pass this routers into ownerRoutes function which was imported from route/ownerRouter.js. This function will mutate ownerRouter object
// and mount it to routes defined in ownerRouter file. Object is mutated by reference, so return value does not need to be explicitly assigned.
testRoutes(testRouter);
//Middleware assinged
app.use("/test", testRouter);


//===============================================================================================================================
//=================================================    Routing for user / paths     =============================================
//===============================================================================================================================
// Create a new instance of a router which will be used for USER routes
const userRouter = express.Router();
// Pass this routers into userRoutes function which was imported from route/userRouter.js. This function will mutate userRouter object
// and mount it to routes defined in userROuter file. Object is mutated by reference, so return value does not need to be explicitly assigned.
userRoutes(userRouter);
//Middleware assinged
app.use("/", userRouter);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
