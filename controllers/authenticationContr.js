const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

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
    });
    const {password, ...userData} = newUser._doc;
  
    const token = siginToken(newUser._id);

    res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
      httpOnly: false,
      maxAge: 30 * 20 * 60 * 60, // 30 days
      secure: process.env.NODE_ENV === !'development',
      sameSite: 'strict',
    }));

 
    res.status(201).json({
      status: 'success',
      data: { userData },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail log in",
      message: err || 'err'
    })
  }
};


exports.logIn = async (req, res) => {
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

  // set cookie

  const token = siginToken(user._id)

  res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
    httpOnly: false,
    maxAge: 30 * 20 * 60 * 60, // 30 days
    secure: process.env.NODE_ENV === !'development',
    sameSite: 'strict',
  }));

  
  res.status(200).json({
    status: 'success',
  })

} catch (err) {
  res.status(400).json({
    status: "Fail",
    message: err.message || 'Error during login'
  })
}
}

// LOGOUT USER

exports.logOut = async (req, res) => {
  // DELETE COOKIE
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/api/users'
  });

  res.status(200).json({
    message: 'LogOut successfully'
  })
}

exports.protect = async (req, res, next) => {
    let token;

    // read the JWT from the cookie 
    token = req.cookies.jwt;

    if (token) {
      try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        
        next()
      } catch (err) {
        console.log(err);

        res.status(401).json({
          status: "fail",
          message: 'Token Fail!'
        })
      }
      
    } else {
      res.status(401).json({
        status: "fail",
        message: 'Not authorized, no token!'
      })
    }
  }

  

