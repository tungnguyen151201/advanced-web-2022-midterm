const { User, Blacklist, Groups } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generateTokens = require('../utils/generateToken');
const { getGroupById, editGroup } = require('../group/groupsController');
// const tokenList = {};
async function Register(req) {
  try {
    if (!req) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const { username, password, firstName, lastName, email } = req;
    if (!username || !password || !firstName || !lastName || !email) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const existsUser = await User.findOne({ username });
    if (existsUser) {
      return { status: false, message: 'Invalid username!' };
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const infoUser = {
      username,
      password: passwordHash,
      email,
      firstName,
      lastName,
      status: 'Pending',
    };

    const newUser = await User.create(infoUser);

    if (!newUser) {
      return { status: false, message: 'register fail!' };
    }
    return { status: true, message: 'register success!' };
  } catch (error) {
    return { status: false, message: error };
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
    const myProfile = await User.findOne(
      { _id: userId },
      'username createAt firstName lastName status'
    );
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

    const editProfile = await User.updateOne(
      { _id: userId },
      { ...profileInfo }
    );
    if (!editProfile) {
      return { status: false, message: 'Invalid Information!' };
    }
    return { status: true, message: 'Update Profile successful!' };
  } catch (error) {
    throw error;
  }
}
async function Activate(token) {
  try {
    await User.updateOne(
      { emailToken: token },
      { emailToken: '', status: 'Active' }
    );
  } catch (error) {
    throw error;
  }
}
async function UpdateEmailToken(userId, emailToken) {
  try {
    await User.findByIdAndUpdate(userId, { emailToken });
  } catch (error) {
    throw error;
  }
}
async function JoinGroup(userId, groupId) {
  try {   
    const group = await getGroupById(groupId);
    if (!group) return { message: 'group not found'};
    let { members, owner, coowner } = group;
    members = members.map(member => member.toString());
    coowner = coowner.map(coowner => coowner.toString());

    if (
      owner.toString() === userId ||
      members.includes(userId) ||
      coowner.includes(userId)
    ) {
      return { message: 'user already been in this group'};
    }

    members.push(userId);
    await Groups.updateOne(
      { _id: groupId },
      {
        ...group,
        members,
      }
    );
    return { message: 'join success'};
  } catch (error) {
    throw error;
  }
}
module.exports = {
  Register,
  Login,
  Activate,
  Logout,
  MyProfile,
  EditProfile,
  UpdateEmailToken,
  JoinGroup,
};
