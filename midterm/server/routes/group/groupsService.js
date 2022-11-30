const {
  getGroupById,
  myGroup,
  createGroup,
  editGroup,
  deleteGroup,
} = require('./groupsController');
async function GetGroupById(req, res) {
  try {
    const getGroupRes = await getGroupById(req.body);
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}

async function MyGroup(req, res) {
  try {
    const MyGroupRes = await myGroup(req.user.id);
    res.send(MyGroupRes);
  } catch (error) {
    throw error;
  }
}
async function CreateGroup(req, res) {
  try {
    const createGroupRes = await createGroup(req.body, req.user.id);
    res.send(createGroupRes);
  } catch (error) {
    throw error;
  }
}
async function EditGroup(req, res) {
  try {
    const editGroupRes = await editGroup(req.user, req.params.id, req.body);
    res.send(editGroupRes);
  } catch (error) {
    throw error;
  }
}
async function DeleteGroup(req, res) {
  try {
    const deleteGroupRes = await deleteGroup(req.user, req.params.id);
    res.send(deleteGroupRes);
  } catch (error) {
    throw error;
  }
}
module.exports = {
  GetGroupById,
  MyGroup,
  CreateGroup,
  EditGroup,
  DeleteGroup,
};
