const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const fs = require("fs");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const photosMiddlewarMulter = multer({ dest: "uploads/" });

const connectDB = require("./models/connectDB");
const User = require("./models/Users");
const Place = require("./models/Place");

// hashing users password
const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "dfg3rtegd3456uyjh";

// middleware to display photos in the browser
app.use("/uploads", express.static(__dirname + "/uploads"));
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

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (err) {
    console.log(err);
  }
});

app.post("/upload", photosMiddlewarMulter.array("photos", 100), (req, res) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads\\", ""));
    }

    res.json(uploadedFiles);
  } catch (err) {
    console.log("Error in file upload. Try again!!!");
  }
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    desc,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret);
      const places = await Place.create({
        owner: userData.id,
        title,
        address,
        photos,
        desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.status(200).json(places);
    } catch (err) {
      res.json(err, "Unable to create!!!");
    }
  } else {
    res.json("Token not found");
  }
});

const port = 4000;
app.listen(port, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`Listening on port ${port}`);
});
