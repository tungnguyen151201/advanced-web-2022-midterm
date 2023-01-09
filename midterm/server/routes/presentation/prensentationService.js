const {
  getPresentationById,
  creatPresentation,
  editPresentaion,
  deletePresentation,
  getPresentations,
  loadMessage,
} = require('./presentationController');
async function GetPresentations(req, res) {
  try {
    const getGroupRes = await getPresentations(req.user.id);
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}
async function GetPresentationById(req, res) {
  try {
    const getGroupRes = await getPresentationById(req.params.id, req.user.id);
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}

async function CreatPresentation(req, res) {
  try {
    const createGroupRes = await creatPresentation(req.body, req.user.id);
    res.send(createGroupRes);
  } catch (error) {
    throw error;
  }
}
async function EditPresentaion(req, res) {
  try {
    const editGroupRes = await editPresentaion(
      req.params.id,
      req.body,
      req.user.id
    );
    res.send(editGroupRes);
  } catch (error) {
    throw error;
  }
}
async function DeletePresentation(req, res) {
  try {
    const deleteGroupRes = await deletePresentation(req.user, req.params.id);
    res.send(deleteGroupRes);
  } catch (error) {
    throw error;
  }
}
async function LoadMessage(req, res) {
  try {
    const messageRes = await loadMessage(req.params.idPresent);
    res.send(messageRes);
  } catch (error) {
    throw error;
  }
}
module.exports = {
  GetPresentations,
  GetPresentationById,
  CreatPresentation,
  EditPresentaion,
  LoadMessage,
  DeletePresentation,
};
