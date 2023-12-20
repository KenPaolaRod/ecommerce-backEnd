const User = require('../models/userModel');

exports.signUp = async (req, res) => {

  try {
    const newUser = await User.create({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
    });

    res.status(202).json({
      status: "sucessful",
      data: {newUser}
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err || 'err'
    })
  }
}
