const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// @desc  register new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("register user");
  if (!name || !password || !email) {
    res.status(400);
    throw new Error("please add all fields");
  }
  //check if user exists
  const userExists = await User.findOne({ email }); //tricky add in email as object
  if (userExists) {
    res.status(400);
    throw new Error("user already exists ");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    const io = req.app.get("socketio"); //emiting  inside response
    io.emit("hi!");
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  authenticate user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, socketId } = req.body;
  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const io = req.app.get("socketio"); //emiting  inside response
    io.emit("recieve_message", "hello");
    io.to(socketId).emit(/* ... */);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

// @desc  get user data
// @route GET /api/users/
// @access Private

const getMe = asyncHandler(async (req, res) => {
  const { name, email, _id } = await User.findById(req.user.id);
  //req.user.id comes from auth middleware after decoding token

  res.status(200).json({ id: _id, name, email });
});

// generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, "REX", { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
