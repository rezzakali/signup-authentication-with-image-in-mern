// external imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
// hashing password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});
// generate token
userSchema.methods.generateToken = async function () {
  try {
    let generateToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: generateToken });
    await this.save();
    return generateToken;
  } catch (error) {
    console.log(error);
  }
};

// model
const User = mongoose.model('User', userSchema);

export default User;
