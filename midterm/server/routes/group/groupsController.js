const { Groups, User } = require('../../models');

async function getGroup() {
  try {
    // if (!url) {
    //   return { status: false, message: 'Invalid Infomation!' };
    // }
    const existsUrls = await Groups.find().lean();
    if (!existsUrls) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    return { status: true, message: 'get successful!', groupInfo: existsUrls };
  } catch (error) {
    throw error;
  }
}
async function myGroup({ userId }) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const myGroups = await Groups.find({ members: userId });
    return { status: true, message: 'get success!', myGroups };
  } catch (error) {
    throw error;
  }
}
async function createGroup({ groupname, members, coowner }, owner) {
  try {
    if (!groupname) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    // Kiểm tra member nhập vào có trong bảng user hay không
    const existsMember = await User.find({ id: { $in: members } }).lean();
    if (!existsMember) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const myGroups = await Groups.create({
      groupname,
      members,
      owner,
      coowner,
    });
    if (!myGroups) {
      return { status: false, message: 'error Infomation!' };
    }
    await Groups.findByIdAndUpdate(
      { _id: myGroups._id },
      { url: myGroups._id }
    );
    return { status: true, message: 'create successful!' };
  } catch (error) {
    throw error;
  }
}
async function editGroup(userInfo, groupId, groupInfo) {
  try {
    if (!groupId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    // Kiểm tra có phải owner hay không?
    const IsOwner = await Groups.findOne({ owner: userInfo.id }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credenticals!' };
    }
    //Kiểm tra xem có là co-owner hay member chưa?
    const existedUser = await Groups.findOne({
      $or: [{ members: groupInfo.members }, { coowner: groupInfo.coowner }],
    }).lean();
    if (existedUser) {
      return { status: false, message: 'Invalid Credenticals!' };
    }
    //Kiểm tra id nhập vào có trong bảng user hay không?
    const existsMember = await User.find({ _id: groupInfo.members }).lean();
    if (!existsMember) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    //Update sau khi đã kiểm tra
    const myGroups = await Groups.findOneAndUpdate({ groupId }, { groupInfo });
    return { status: true, message: 'update successful!', myGroups };
  } catch (error) {
    throw error;
  }
}
async function deleteGroup(userInfo, { groupId }) {
  try {
    if (!groupId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    // Kiểm tra có phải owner hay không?
    const IsOwner = await Groups.findOne({ owner: userInfo.id }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credenticals!' };
    }

    await Groups.findOneAndDelete({ groupId });
    return { status: true, message: 'delete successful!' };
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getGroup,
  myGroup,
  createGroup,
  editGroup,
  deleteGroup,
};
