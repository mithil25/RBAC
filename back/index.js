const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = require("./models/User"),
  app = express(),
  PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/RBAC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo.."))
  .catch((err) => console.log("Error\n %s", err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});
app.post("/signup", async (req, res) => {
  try {
    const newUser = await new User(req.body);
    await newUser.save();
    res.send({ status: 200, message: "new User created successfully" });
  } catch (err) {
    res.send({ status: 400, message: `new User not create error:- ${err}` });
  }
});

app.get("/userInfo", async (req, res) => {
  const users = await User.find();
  res.json({ users_list: users });
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  User.find({ username: username, password: password }, function (err, data) {
    if (err) {
      res.send({ status: 400, message: `User not found:- ${err}` });
    } else {
      res.send({ status: 200, message: `User found` });
    }
  });
});
app.listen(PORT, () => {
  console.log("Server listening at port:-", PORT);
});