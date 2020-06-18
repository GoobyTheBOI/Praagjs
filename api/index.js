const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

// ! Starrt the server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// ! Load frontend
app.use(express.static(__dirname + "/../frontend/build"));
app.use(bodyParser.json());

// ! API Routeess
app.use('/api/login', require('./routes/login'));
app.use('/api/contacts', auth, require('./routes/contacts'));
app.use('/api/activities', require('./routes/activities'));

// ! Catch 404 handler for api routes
app.use("/api/*", (req, res, next) => {
  res.status(404).json({
    message: `Sorry, can't find that route`,
  });
});

// ! Load admin panel on /admin
app.use("/admin", express.static(__dirname + "/../admin/build"));
app.use("/admin/*", express.static(__dirname + "/../admin/build"));

// ! Load frontend from app (subdirs)
app.use("/*", express.static(__dirname + "/../frontend/build"));
