const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
  const token = req.query.token;
  let user;

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      user = await User.findById(decoded.id).select('-password')
    }
      
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: 'Not authorized, invalid user'
      })
    }

    res.status(200).json({
      status: 'success',
      userInfo: user
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: 'Not authorized, invalid token'
    })
  }
}

// exports.getAllUsers = async (req, res) => {
//   const users = await User.find();
//   try {
//     res.status(200).json({
//       status: "sucessful",
//       result: users.length,
//       data: {
//         users
//       }
//     })
//   } catch (err) {
//     res.status(404).json({
//       status: "Fail",
//       message: err || 'error'
//     })
//   }
// }

// exports.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     res.status(200).json({
//       status: "success",
//       data: {
//         updatedUser
//       }
//     })
//   } catch (err) {
//     res.status(400).json({
//       status: "Fail",
//       message: err || 'error'
//     })
//   }
// }

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     res.status(204).json({
//       status: "success",
//       data: {
//         user: null
//       }
//     })
//   } catch (err) {
//     res.status(400).json({
//       status: "Fail",
//       message: err || 'error'
//     })
//   }
// }