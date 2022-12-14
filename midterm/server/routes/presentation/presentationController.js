const { Presentation, Room } = require('../../models');
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
    return {
      status: false,
      message: error,
    };
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
    return {
      status: false,
      message: error,
    };
  }
}
async function creatPresentation(presentationInfo, userId) {
  try {
    // Tao Presentation
    if (!presentationInfo || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    const { name, slides } = presentationInfo;

    const newPresentation = await Presentation.create({
      name,
      slides,
      owner: userId,
    });
    // Tao Room chat sau khi tao presentation
    const presentationId = newPresentation._id;
    const existedRoom = await Room.findOne(
      { presentation: presentationId },
      '_id'
    ).lean();

    if (existedRoom) {
      return {
        status: false,
        message: 'Room existed',
      };
    }

    const room = await Room.create({ presentation: presentationId });

    if (!newPresentation || !room) {
      return { status: false, message: 'error Infomation!' };
    }
    return { status: true, message: 'create successful!', newPresentation };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
}
async function editPresentaion(presentationId, presentationInfo, userId) {
  try {
    console.log(presentationInfo);
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
    await Room.findOneAndDelete({ presentation: presentationId });
    return { status: true, message: 'delete successful!' };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
}
module.exports = {
  getPresentationById,
  creatPresentation,
  editPresentaion,
  deletePresentation,
  getPresentations,
};
