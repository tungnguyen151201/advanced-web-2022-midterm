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
      message: 'getGroupById - groupsController error: ' + error,
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
      message: 'myGroup - groupsController error: ' + error,
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
    await Groups.findOneAndUpdate({ _id: myGroups._id }, { url: myGroups._id });
    return { status: true, message: 'create successful!' };
  } catch (error) {
    return {
      status: false,
      message: 'createGroup - groupsController error: ' + error,
    };
  }
}
async function editGroup(userInfo, groupId, groupInfo) {
  try {
    if (!groupId || !groupInfo || !userInfo) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    // Kiểm tra có phải owner hay không?
    const IsOwner = await Groups.findOne({
      _id: groupId,
      owner: userInfo.id,
    }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credenticals!' };
    }
    //Update sau khi đã kiểm tra
    const myGroups = await Groups.findOneAndUpdate(
      { _id: groupId },
      { ...groupInfo },
      { new: true }
    );
    return { status: true, message: 'update successful!', myGroups };
  } catch (error) {
    return {
      status: false,
      message: 'editGroup - groupController error:' + error,
    };
  }
}
async function deleteGroup(userInfo, { groupId }) {
  try {
    if (!groupId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    // Kiểm tra có phải owner hay không?
    const IsOwner = await Groups.findOne({ owner: userInfo.id, _id: groupId }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credenticals!' };
    }

    await Groups.deleteOne({ _id: groupId });
    return { status: true, message: 'delete successful!' };
  } catch (error) {
    return {
      status: false,
      message: 'deleteGroup - groupsController error: ' + error,
    };
  }
}
async function promoteToCoowner(userInfo, userId, groupId) {
  const existedUser = await User.findById(userId).lean();
  if (!existedUser || userInfo.id === userId) {
    return { status: false, message: 'Invalid User' };
  }
  const group = await Groups.findById(groupId, 'coowner members').lean();
  if (!group) {
    return { status: false, message: 'Group not found' };
  }
  let { coowner, members } = group;
  members = members.map((member) => member._id.toString());
  coowner = coowner.map((coowner) => coowner._id.toString());

  if (!members.includes(userId)) {
    return {
      status: false,
      message: 'This user is not a member of this group',
    };
  }
  if (coowner.includes(userId)) {
    return { status: false, message: 'This user has already been coowner' };
  }
  members.pop(userId);
  coowner.push(userId);
  const res = await editGroup(userInfo, groupId, {
    coowner,
    members,
  });
  return res;
}
async function demoteToMember(userInfo, userId, groupId) {
  const existedUser = await User.findById(userId).lean();
  if (!existedUser || userInfo.id === userId) {
    return { status: false, message: 'Invalid User' };
  }
  const group = await Groups.findById(groupId, 'coowner members').lean();
  if (!group) {
    return { status: false, message: 'Group not found' };
  }
  let { coowner, members } = group;
  members = members.map((member) => member._id.toString());
  coowner = coowner.map((coowner) => coowner._id.toString());

  if (!coowner.includes(userId)) {
    return {
      status: false,
      message: 'This user is not a coowner of this group',
    };
  }
  if (members.includes(userId)) {
    return { status: false, message: 'This user has already been member' };
  }
  coowner.pop(userId);
  members.push(userId);
  const res = await editGroup(userInfo, groupId, {
    coowner,
    members,
  });
  return res;
}
async function kickAMember(userInfo, userId, groupId) {
  const existedUser = await User.findById(userId).lean();
  if (!existedUser || userInfo.id === userId) {
    return { status: false, message: 'Invalid User' };
  }
  const group = await Groups.findById(groupId, 'coowner members').lean();
  if (!group) {
    return { status: false, message: 'Group not found' };
  }
  let { coowner, members } = group;
  members = members.map((member) => member._id.toString());
  coowner = coowner.map((coowner) => coowner._id.toString());

  if (coowner.includes(userId)) {
    coowner.pop(userId);
  }
  if (members.includes(userId)) {
    members.pop(userId);
  }

  const res = await editGroup(userInfo, groupId, {
    coowner,
    members,
  });
  return res;
}
module.exports = {
  getGroupById,
  myGroup,
  createGroup,
  editGroup,
  deleteGroup,
  promoteToCoowner,
  demoteToMember,
  kickAMember,
};
