const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const siginToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

exports.signUp = async (req, res) => {

  try {

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      passwordChangedAt: req.body.passwordChangedAt,
    });
  
    const token = siginToken(newUser._id);

    res.status(201).json({
      status: "sucessful",
      token,
      data: {newUser}
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err || 'err'
    })
  }
};


