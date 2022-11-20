const { Groups, Account } = require('../../models');

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
async function createGroup({ groupname, members }) {
  try {
    if (!groupname) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const existsMember = await Account.find({ id: { $in: members } }).lean();
    if (!existsMember) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const myGroups = await Groups.create({ groupname, members });
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
async function editGroup(groupId, groupInfo) {
  try {
    if (!groupId) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    const existsMember = await Account.find({ _id: groupInfo.members }).lean();
    if (!existsMember) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const myGroups = await Groups.findOneAndUpdate({ groupId }, { groupInfo });
    return { status: true, message: 'update successful!', myGroups };
  } catch (error) {
    throw error;
  }
}
async function deleteGroup({ groupId }) {
  try {
    if (!groupId) {
      return { status: false, message: 'Invalid Infomation!' };
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
