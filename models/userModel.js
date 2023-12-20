const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'A User must have a name'],
    trim: true
  },
  email:{
    type: String,
    required: [true, 'A User must have a email'],
    trim: true,
    unique:true,
    lowercase:true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'El formato de correo electrónico {VALUE} no es válido.'
    ]  },
  password:{
    type: String,
    required: [true, 'A User must have a password'],
    trim: true,
    minlength: 8

  }
});

const User = mongoose.model('User', UserScheme);

module.exports = User;