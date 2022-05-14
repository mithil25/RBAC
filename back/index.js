const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const md5 = require("md5");
const app = express();
const cors = require("cors");
const rsa = require("node-rsa");
const fs = require("fs");

var publicKey = new rsa();
var privateKey = new rsa();

var public = fs.readFileSync("./Keys/public.pem", "utf8");
var private = fs.readFileSync("./Keys/private.pem", "utf8");
publicKey.importKey(public);
privateKey.importKey(private);
require("dotenv").config();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

mongoose.connect(process.env.ATLAS);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  imgURL: String,
});

const Post = mongoose.model("Post", postSchema);

const upload = (name) =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: "public-read",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, name);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
  });

app.post("/upload", (req, res) => {
  const fileName = `file-${Date.now()}`;

  const uploadSingle = upload(fileName).single("imgFile");

  uploadSingle(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    const encryptedLink = privateKey.encryptPrivate(
      req.file.location,
      "base64"
    );

    // console.log(encryptedLink)
    // // const decrypt = publicKey.decryptPublic(encryptedLink,'utf8');
    // console.log(decrypt)

    const newPost = new Post({
      imgURL: encryptedLink,
    });
    newPost.save();
    res.send(encryptedLink);
  });
});

app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: md5(req.body.password),
  });
  newUser.save();
  res.send("true");
});

app.get("/decrypt", (req, res) => {
  Post.findOne(
    ({ id: "627fb9217b1d84fb15a5094e" },
    function (err, data) {
      if (err) {
        res.send("Error in Decrypting");
        return;
      } else {
        const hash = data.imgURL;
        const decrypted = publicKey.decryptPublic(hash, "utf8");
        res.send(decrypted);
      }
    })
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    User.findOne({ email: email }, function (err, foundUser) {
      if (foundUser) {
        if (foundUser.password === md5(password)) {
          res.send("true");
        } else {
          res.send("false");
        }
      } else {
        res.send("false");
      }
    });
  } catch (error) {
    throw "user does not exist";
  }
});

app.listen(5000, () => {
  console.log("Server is up on 5000");
});
