import './Slide.css';
import Edit from '../Edit/Edit';
import { useState } from 'react';

export default function Slide({ setInfoSlide, slideIndex }) {
  const [detailSlide, setDetail] = useState({
    question: '12+1?',
    options: ['0', '13', '5'],
  });
  const setSlideDetail = (info) => {
    setDetail(info);
  };
  const handleChangeSlide = () => {
    setInfoSlide(detailSlide, slideIndex);
  };
  return (
    <div className='slide__container' onChange={handleChangeSlide}>
      <div className='slide slide--active'>
        <p>1</p>
        <div className='slide__demo'>Slide</div>
      </div>
      <Edit setSlideDetail={setSlideDetail} />
    </div>
  );
}
