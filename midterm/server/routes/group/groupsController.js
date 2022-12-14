const { Groups, User } = require('../../models');

async function getGroupById(groupId) {
  try {
    const group = await Groups.findById(groupId)
      .populate('owner')
      .populate('coowner')
      .populate('members')
      .lean();
    if (!group) {
      return null;
    }
    return group;
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
}
async function myGroup(userId) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const myGroups = await Groups.find({
      $or: [{ members: userId }, { owner: userId }, { coowner: userId }],
    })
      .populate('members')
      .populate('coowner')
      .populate('owner')
      .lean();
    return { status: true, message: 'get success!', myGroups };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
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
    await Groups.findOneAndUpdate(
      { _id: myGroups._id },
      { url: myGroups._id }
    );
    return { status: true, message: 'create successful!' };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
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
    const existsMember = await User.find({
      $or: [{ _id: groupInfo.members }, { _id: groupInfo.members }],
    }).lean();
    if (!existsMember) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    //Update sau khi đã kiểm tra
    const myGroups = await Groups.findOneAndUpdate(
      { _id: groupId },
      { ...groupInfo }
    );
    return { status: true, message: 'update successful!', myGroups };
  } catch (error) {
    return { status: false, message: 'Invalid Infomation!' };
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
    return {
      status: false,
      message: error,
    };
  }
}
module.exports = {
  getGroupById,
  myGroup,
  createGroup,
  editGroup,
  deleteGroup,
};
