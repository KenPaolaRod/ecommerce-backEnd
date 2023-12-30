const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

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
    ]  
  },

  password:{
    type: String,
    required: [true, 'A User must have a password'],
    trim: true,
    minlength: 8,
    select: false
  },

  confirmPassword: {
    type: String,
    required: [true, 'A user must have a password'],
    trim: true,
    validate: function (el) {
      return el === this.password
    }, 
    message: "passwords are not the same!!"
  }

});

UserScheme.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // encrypting the password
  this.password = await bcryptjs.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

// compare if the passwords of the person login and the passw of the db are the same
UserScheme.methods.correctPassword = async function (candidatePassw, UserPassw) {
  return await bcryptjs.compare(candidatePassw, UserPassw)
}



const User = mongoose.model('User', UserScheme);

module.exports = User;