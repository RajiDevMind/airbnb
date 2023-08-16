const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./models/connectDB");
const User = require("./models/Users");

// hashing users password
const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "dfg3rtegd3456uyjh";

// middleware to convert users data to json format
app.use(express.json());
// middleware to assigned cookie
app.use(cookieParser());
// middleware to pass data cross platform
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
    console.log("Unprocessable Entity, Registration failed!");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password not found");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret);
      const user = await User.findById(userData.id);
      console.log(user.id);
      if (user) {
        const { name, email, _id } = user;
        res.json({ name, email, _id });
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.json("No user token found");
  }
});

// app.get("/account", (req, res) => {
//   res.json("account page for the user!");
// });

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

const port = 4000;
app.listen(port, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`Listening on port ${port}`);
});
