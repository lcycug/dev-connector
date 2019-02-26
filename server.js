const express = require("express");
const mongoose = require("mongoose");

const app = express();

// config DB
const db = require("./config/keys").mongoURI;
// connect to MongoDB
mongoose
  .connect(db)
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
