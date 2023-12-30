const User = require('../models/userModel');


exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    res.status(200).json({
      status: "sucessful",
      result: users.length,
      data: {
        users
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err || 'error'
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        updatedUser
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err || 'error'
    })
  }
}

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    // console.log(req.user);

    res.status(200).json({
      status: "success",
      data: {
        user
      }
    }) 
  } else {
    res.status(400).json({
     status: "Fail",
     message: err || 'error'
   })
 }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {
        user: null
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err || 'error'
    })
  }
}