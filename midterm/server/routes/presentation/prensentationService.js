const {
  getPresentationById,
  creatPresentation,
  editPresentaion,
  deletePresentation,
  getPresentations,
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
    const getGroupRes = await getPresentationById(req.params.slideId);
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
      req.body,
      req.params.slideId,
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
  GetPresentations,
  GetPresentationById,
  CreatPresentation,
  EditPresentaion,
  DeletePresentation,
};
