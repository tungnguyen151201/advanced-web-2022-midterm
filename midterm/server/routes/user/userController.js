const { User } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

async function Register({ username, password }) {
  try {
    if (!username || !password) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const existsUser = await User.findOne({ username });
    if (existsUser) {
      return { status: false, message: 'Invalid username!' };
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const infoUser = {
      username: username,
      password: passwordHash,
    };

    const newUser = await User.create(infoUser);

    if (!newUser) {
      return { status: false, message: 'register fail!' };
    }
    return { status: true, message: 'register success!', user: infoUser };
  } catch (error) {
    throw error;
  }
}
async function Login({ username, password }) {
  try {
    if (!username || !password) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const existsUser = await User.findOne({ username });
    if (!existsUser) {
      return { status: false, message: 'Invalid User!' };
    }
    const match = await bcrypt.compare(password, existsUser.password);

    if (!match) {
      return { status: false, message: 'Invalid username or password!' };
    }
    const token = jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    return { status: true, message: 'login success!', token };
  } catch (error) {
    throw error;
  }
}

async function Activate(userId) {
  try {
    await User.findByIdAndUpdate(userId, { status: 'Active' });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  Register,
  Login,
  Activate,
};
