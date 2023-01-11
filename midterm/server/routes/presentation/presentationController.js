const { Presentation, Room } = require('../../models');
async function getMyPresentations(userId) {
  try {
    if (!userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    const presentations = await Presentation.find({
      $or: [{ owner: userId }, { coowners: userId }],
    })
      .populate('owner')
      .lean();
    if (presentations) {
      return {
        status: true,
        message: 'Get presentation Success!',
        presentations,
      };
    } else {
      return {
        status: false,
        message: 'Not found presentations',
        presentations,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
async function getPresentationById(presentationId, userId) {
  try {
    if (!presentationId || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    const presentation = await Presentation.findOne({
      _id: presentationId,
      $or: [{ owner: userId }, { coowners: userId }],
    }).lean();
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
    if (!presentationInfo || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    const { name, slides } = presentationInfo;

    const newPresentation = await Presentation.create({
      name,
      slides,
      owner: userId,
      coowners: [],
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
    if (!presentationId || !presentationInfo || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    const myPresentation = await Presentation.findOneAndUpdate(
      { _id: presentationId, owner: userId },
      { ...presentationInfo },
      { new: true }
    );
    return { status: true, message: 'update successful!', myPresentation };
  } catch (error) {
    return { status: false, message: error.message };
  }
}
async function deletePresentation(userId, presentationId) {
  try {
    if (!presentationId || !userId) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const { deletedCount } = await Presentation.deleteOne({
      _id: presentationId,
      owner: userId,
    });
    if (deletedCount > 0) {
      const { deletedCount } = await Room.deleteOne({
        presentation: presentationId,
      });
      if (deletedCount > 0) {
        return { status: true, message: 'delete successful!' };
      }
    }
    return { status: false, message: 'delete failed!' };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
}
async function loadMessage(idPresent) {
  try {
    if (!idPresent) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const existsRoom = await Room.findOne({ presentation: idPresent });
    if (!existsRoom) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    return {
      status: true,
      message: 'get message successful!',
      messages: existsRoom.messages,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
}
module.exports = {
  getMyPresentations,
  getPresentationById,
  creatPresentation,
  editPresentaion,
  deletePresentation,
  loadMessage,
};
