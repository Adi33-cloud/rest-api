const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//VALIDATION imports
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

//POST: Register a new user
router.post("/register", async (req, res) => {
  //Validate request data so that User has proper input
  const { error } = registerValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //Checking to see if user is in the database already
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ userId: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//POST: Login a new user
router.post("/login", async (req, res) => {
  //Validate request data to see if login input is valid
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //Checking to see if email exists
  const userFound = await User.findOne({ email: req.body.email });
  if (!userFound) return res.status(400).send("Email or Password is invalid");

  //Checking to see if password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    userFound.password
  );
  if (!validPassword)
    return res.status(400).send("Email or Password is invalid");

  //Create and assign a token for logged in user
  const token = jwt.sign({ _id: userFound._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send({ authToken: token });
});

//DELETE: delete a user
router.delete("/:userID", async (req, res) => {
  try {
    const userRemoved = await User.remove({ _id: req.params.userID });
    res.json(userRemoved);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
