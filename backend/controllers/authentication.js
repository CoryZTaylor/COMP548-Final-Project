const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const generateToken = require("../utils/token");
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

exports.registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const existingUsername = await UserModel.findOne({ username });
  const existingEmail = await UserModel.findOne({ email });

  if (existingUsername) {
    res.status(400).json({ message: 'User with this username already exists.' });
  } else if (existingEmail) {
    res.status(400).json({ message: 'User with this email already exists.' });
  } else if (confirmPassword != password){
    res.status(400).json({ message: 'Passwords must match.' });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(req.file)
    const newUser = new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
      image: req.file ? req.file.path : null
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id)
    });
  }
}

exports.userInfo = async (req, res) => {
  try {
    const response = await UserModel.find({_id: req.userId})
    const user = response[0]
    payload = {
      username: user.username,
      email: user.email
    }
    res.status(200).json(payload)
  } catch (error) {
      res.status(500).json({message: 'Server Error'})
  }
}

exports.verifyToken = (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ success: false, message: 'Token is invalid' });
      } else {
        res.status(200).json({ success: true, message: 'Token is valid' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.uploadImage = async (req, res) => {
  const { user } = req;
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file was uploaded' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          'image.data': req.file.buffer,
          'image.contentType': req.file.mimetype,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};