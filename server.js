const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const notes = require("./routes/api/notes");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

// Use routes
app.use("/api/users", users);
app.use("/api/notes", notes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
