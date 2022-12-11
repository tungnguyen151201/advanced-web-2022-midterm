const { Slides } = require('../../models');
async function getSlides() {
  try {
    const slide = await Slides.find({}).lean();
    if (!slide) {
      return { status: false, message: 'Cant find slide!', slide: null };
    }
    return { status: true, message: 'Get Slide Success!', slide };
  } catch (error) {
    throw error;
  }
}
async function getSlideById(slideId) {
  try {
    if (!slideId) {
      return { status: false, message: 'invalid Information!' };
    }
    const slide = await Slides.findById(slideId).lean();
    if (!slide) {
      return { status: false, message: 'Cant find slide!', slide: null };
    }
    return { status: true, message: 'Get Slide Success!', slide };
  } catch (error) {
    throw error;
  }
}
async function createSlide(slideInfo, owner) {
  try {
    const { question, options } = slideInfo;
    console.log(options);
    if (!question || !options || !owner) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    const newSlide = await Slides.create({
      question,
      options,
    });
    if (!newSlide) {
      return { status: false, message: 'error Infomation!' };
    }
    return { status: true, message: 'create successful!', newSlide };
  } catch (error) {
    throw error;
  }
}
async function editSlide(slideInfo, slideId, owner) {
  try {
    if (!question || !options || !owner) {
      return { status: false, message: 'Invalid Infomation!' };
    }
    //Update sau khi đã kiểm tra
    const mySlide = await Slides.findOneAndUpdate(
      { _id: slideId },
      { ...slideInfo }
    );
    return { status: true, message: 'update successful!', mySlide };
  } catch (error) {
    return { status: false, message: 'Invalid Infomation!' };
  }
}
async function deleteSlide(userInfo, slideId) {
  try {
    if (!slideId || !userInfo) {
      return { status: false, message: 'Invalid Infomation!' };
    }

    await Slides.findOneAndDelete({ _id: slideId });
    return { status: true, message: 'delete successful!' };
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getSlides,
  getSlideById,
  createSlide,
  editSlide,
  deleteSlide,
};
