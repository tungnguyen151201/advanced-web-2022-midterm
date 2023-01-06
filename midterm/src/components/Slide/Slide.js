import './Slide.css';
import Edit from '../Edit/Edit';
import { useState } from 'react';

export default function Slide({
  setInfoSlide,
  slideIndex,
  slideInfo,
  currentSlide,
}) {
  const [detailSlide, setDetail] = useState({
    question: '12+1?',
    options: ['0', '13', '5'],
  });

  const handleChangeSlide = () => {
    setInfoSlide(detailSlide, slideIndex);
  };
  const handleCurrentSlide = () => {
    currentSlide({ index: slideIndex, ...slideInfo });
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
