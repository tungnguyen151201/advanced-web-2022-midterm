const {
  getPresentationById,
  creatPresentation,
  editPresentaion,
  deletePresentation,
  getMyPresentations,
} = require('./presentationController');
async function GetMyPresentations(req, res) {
  try {
    const getGroupRes = await getMyPresentations(req.user.id);
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
module.exports = {
  GetMyPresentations,
  GetPresentationById,
  CreatPresentation,
  EditPresentaion,
  DeletePresentation,
};
