const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const express = require("express");
const app = express();
const users = require("./routes/api/users");
const friendrequests = require("./routes/api/friend-requests");
const events = require("./routes/api/events");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors());
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sign_s3 = require("./controllers/sign_s3");
app.use("/sign_s3", sign_s3.sign_s3);

app.use(passport.initialize());
require("./config/passport")(passport);

// app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);
app.use("/api/friend-requests", friendrequests);
app.use("/api/events", events);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
