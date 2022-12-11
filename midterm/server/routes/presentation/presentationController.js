const { Presentation } = require('../../models');
async function getPresentations(userId) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const IsOwner = await Presentation.findOne({ owner: userId }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credencials!' };
    }
    const presentations = await Presentation.find({}).populate('slides').lean();
    return {
      status: true,
      message: 'Get presentation Success!',
      presentations,
    };
  } catch (error) {
    throw error;
  }
}
async function getPresentationById(presentationId, userId) {
  try {
    if (!presentationId || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const IsOwner = await Presentation.findOne({ owner: userId }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credencials!' };
    }

    const presentation = await Presentation.findById(presentationId)
      .populate('slides')
      .lean();
    if (!presentation) {
      return {
        status: false,
        message: 'Cant find presentation!',
        presentation: null,
      };
    }
    return { status: true, message: 'Get presentation Success!', presentation };
  } catch (error) {
    throw error;
  }
}
async function creatPresentation(presentationInfo, userId) {
  try {
    // console.log(presentationInfo, userId);
    if (!presentationInfo || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    const { name } = presentationInfo;

    const newPresentation = await Presentation.create({
      name,
      owner: userId,
    });
    if (!newPresentation) {
      return { status: false, message: 'error Infomation!' };
    }
    return { status: true, message: 'create successful!', newPresentation };
  } catch (error) {
    throw error;
  }
}
async function editPresentaion(presentationId, presentationInfo, userId) {
  try {
    if (!presentationId || !presentationInfo || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const IsOwner = await Presentation.findOne({ owner: userId }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credencials!' };
    }
    //Update sau khi đã kiểm tra
    const myPresentation = await Presentation.findOneAndUpdate(
      { _id: presentationId },
      { ...presentationInfo }
    );
    return { status: true, message: 'update successful!', myPresentation };
  } catch (error) {
    return { status: false, message: 'Invalid Infomation!' };
  }
}
async function deletePresentation(userId, presentationId) {
  try {
    if (!presentationId || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const IsOwner = await Presentation.findOne({ owner: userId }).lean();
    if (!IsOwner) {
      return { status: false, message: 'Invalid Credencials!' };
    }
    await Presentation.findOneAndDelete({ _id: presentationId });
    return { status: true, message: 'delete successful!' };
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getPresentationById,
  creatPresentation,
  editPresentaion,
  deletePresentation,
  getPresentations,
};
