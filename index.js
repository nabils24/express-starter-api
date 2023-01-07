//Init Path
__path = process.cwd();
// End Init Path

// Init Var Express JS, Cors, Secure
var express = require("express");
var cors = require("cors");
var secure = require("ssl-express-www");
var useragent = require("express-useragent");
var expressip = require("express-ip");

// Const PORT
const PORT = process.env.PORT || 8080 || 5000 || 3000;

// Init Parsing
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");



// Var For Router
var examApi = require("./routes/api");

// Init Express JS
var app = express();

// app use
app.use(cookieParser());
app.set("trust proxy", true);
app.set("json spaces", 2);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware);
app.use(cors());
app.use(secure);
app.use(express.static("public"));
// End app use

// Router
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome To My API",
  });
});
app.use("/api", examApi);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

module.exports = app;
