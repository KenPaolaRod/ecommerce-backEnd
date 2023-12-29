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


exports.logIn = async (req, res, next) => {
  const {email, password} = req.body;

  try {
  // check if email or password exist
  if(!email || !password) {
    return (
        res.status(400).json({
        status: 'Unauthorized',
        message: 'please provide an email and password'
      })
      )
  }

  // check if user exist and password is correct
  const user = await User.findOne({email}).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return (
      res.status(401).json({
        status: 'Unauthorized',
        message: 'incorrect email or password'
      })  
    )
  }


  // if everything is ok, send token to the client 

  const token = siginToken(user._id)
  res.status(200).json({
    status: 'success',
    token
  })

} catch (err) {
  res.status(400).json({
    status: "Fail",
    message: err || 'err'
  })
}
}