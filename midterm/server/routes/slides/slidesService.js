const {
  getSlides,
  getSlideById,
  createSlide,
  editSlide,
  deleteSlide,
} = require('./slidesController');
async function GetSlides(req, res) {
  try {
    const getGroupRes = await getSlides();
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}
async function GetSlideById(req, res) {
  try {
    const getGroupRes = await getSlideById(req.params.slideId);
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}

async function CreateSlide(req, res) {
  try {
    const createGroupRes = await createSlide(req.body, req.user.id);
    res.send(createGroupRes);
  } catch (error) {
    throw error;
  }
}
async function EditSlide(req, res) {
  try {
    const editGroupRes = await editSlide(
      req.body,
      req.params.slideId,
      req.user.id
    );
    res.send(editGroupRes);
  } catch (error) {
    throw error;
  }
}
async function DeleteSlide(req, res) {
  try {
    const deleteGroupRes = await deleteSlide(req.user, req.params.id);
    res.send(deleteGroupRes);
  } catch (error) {
    throw error;
  }
}
module.exports = {
  GetSlides,
  GetSlideById,
  CreateSlide,
  EditSlide,
  DeleteSlide,
};
