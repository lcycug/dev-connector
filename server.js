const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// config DB
const db = require("./config/keys").mongoURI;
// connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//
const posts = require("./api/posts");
const users = require("./api/users");
const profile = require("./api/profile");

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/profile", profile);

app.get("/", (req, res) => res.send("Hello World"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
