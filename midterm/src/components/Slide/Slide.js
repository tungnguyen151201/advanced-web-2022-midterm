import './Slide.css';
import Edit from '../Edit/Edit';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function Slide({
  setInfoSlide,
  slideIndex,
  slideInfo,
  slides,
  currentSlide,
  changeData,
}) {
  const [detailSlide, setDetail] = useState({
    question: '12+1?',
    options: ['0', '13', '5'],
  });
  const token = 'Bearer ' + localStorage.getItem('token');
  const { PresentationId } = useParams();
  const handleChangeSlide = () => {
    setInfoSlide(detailSlide, slideIndex);
  };
  const handleCurrentSlide = async () => {
    currentSlide({ index: slideIndex, ...slideInfo });
    if (!changeData) {
      return;
    }
    const { indexSlide } = changeData;
    if (indexSlide <= slides.length) {
      slides[indexSlide] = changeData;
    } else {
      slides.push(changeData);
    }

    const res = await axios.patch(
      `http://localhost:3001/presentation/edit/${PresentationId}`,
      {
        slides,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res);
  };
  return (
    <div className='slide__container' onChange={handleChangeSlide}>
      <div className='slide slide--active'>
        <p>{slideIndex}</p>
        <div className='slide__demo' onClick={handleCurrentSlide}>
          Slide
        </div>
      </div>
      {/* <Edit slideInfoDetail={slide} currentSlideInfo={currentSlideInfo} /> */}
    </div>
  );
}
