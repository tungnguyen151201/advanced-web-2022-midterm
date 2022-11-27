const { User, Blacklist } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const generateTokens = require('../untils/generateToken');
// const tokenList = {};
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

    const { accessToken, refreshToken } = await generateTokens({
      _id: existsUser._id,
    });
    return {
      status: true,
      message: 'login success!',
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
}
async function Logout(userId, refreshToken) {
  try {
    const userToken = await Blacklist.findOne({ token: refreshToken });
    if (userToken) {
      return { status: false, message: 'Logged Out Sucessfully' };
    }
    await Blacklist.create({ userId: userId, token: refreshToken });
    return { status: true, message: 'Logged Out Sucessfully' };
  } catch (error) {
    throw error;
  }
}
async function MyProfile(userId) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Information!' };
    }
    const myProfile = await User.findOne({ _id: userId });
    if (!myProfile) {
      return { status: false, message: 'Invalid Information!' };
    }
    return { status: true, message: 'Get Profile successful!', myProfile };
  } catch (error) {
    throw error;
  }
}
async function EditProfile(userId, profileInfo) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Information!' };
    }

    const editProfile = await User.findOneAndUpdate(
      { _id: userId },
      { profileInfo }
    );
    if (!editProfile) {
      return { status: false, message: 'Invalid Information!' };
    }
    return { status: true, message: 'Get Profile successful!', editProfile };
  } catch (error) {
    throw error;
  }
}
module.exports = {
  Register,
  Login,
  Logout,
  MyProfile,
  EditProfile,
};
