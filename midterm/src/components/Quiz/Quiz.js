import axios from 'axios';
import './Quiz.css';
import React, { useEffect, useState } from 'react';
import Slide from '../Slide/Slide';

import { useNavigate, useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slide, newSlide] = useState([0]);
  const [slideInfo, setSlideInfo] = useState({
    slides: [
      {
        question: '12+1?',
        options: ['0', '13', '5'],
      },
      {
        question: '12+1?',
        options: ['1', '13', '2'],
      },
    ],
  });
  // const [quizInfo]
  const handleDemo = () => {
    navigate('/demo');
  };
  const handleNewSlide = () => {
    newSlide((arr) => [...arr, `${arr.length + 1}`]);
  };
  const handleSave = async () => {
    console.log(slideInfo);
    // try {
    //   const token = 'Bearer ' + localStorage.getItem('token');
    //   const res = await axios.post(
    //     `http://localhost:3001/presentation/edit/${id}`,
    //     slideInfo,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );
    //   const { status } = res.data;
    //   //   setList(res.data.myGroups);
    // } catch (error) {
    //   console.error(error.message);
    // }
  };
  const setInfoSlide = (info, index) => {
    let arr = Array.from({ length: slide.length }, (v, i) => (v = slide[i]));
    arr[index] = info;

    setSlideInfo(arr);
  };

  return (
    <div className='quiz__container'>
      <div className='quiz__header'>
        <button className='quiz__btn quiz__btn--b m-r' onClick={handleNewSlide}>
          + New slide
        </button>
        <button className='quiz__btn black' onClick={handleSave}>
          Save
        </button>
        <button className='quiz__btn quiz__btn--b' onClick={() => handleDemo()}>
          Demo
        </button>
      </div>
      <main className='quiz__content'>
        <div className='quiz__slide'>
          {slide.map((value, index) => {
            return (
              <Slide
                key={value}
                setInfoSlide={setInfoSlide}
                slideIndex={index}
              />
            );
          })}
        </div>

        {/* <div className='quiz__edit'>
          <Edit />
        </div> */}
      </main>
    </div>
  );
};

export default Quiz;
