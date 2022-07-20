var express = require("express");
var session = require("express-session");

const Role = require("./models/Role");
var app = express();
const dotenv = require("dotenv");
var connectDB = require("./db/config");
var bodyParser = require("body-parser");
var cors = require("cors");
var port = 8000;
dotenv.config();
var authRoute = require("./routes/routes");
app.use(express.static("public"));
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
// Connect to DB
connectDB();

console.log("Connection Establish");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // frontend link
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
// parse application/json
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  })
);
// config express-session
var sess = {
  secret: "ecommerece",
  cookie: {},
  resave: false,
  saveUninitialized: true,
};
app.use("/api/auth", authRoute);
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added ' user ' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin ' to roles collection");
      });
    }
  });
}
initial();
sess.cookie.secure = true; // serve secure cookies
app.use(session(sess));

module.exports = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
