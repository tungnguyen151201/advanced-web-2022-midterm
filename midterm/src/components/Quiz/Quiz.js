import axios from 'axios';
import './Quiz.css';
import '../Slide/Slide.css';
import React, { useEffect, useState } from 'react';
import Slide from '../Slide/Slide';
import Edit from '../Edit/Edit';
import { useNavigate, useParams } from 'react-router-dom';

const Quiz = () => {
  const { PresentationId } = useParams();
  const navigate = useNavigate();
  const [slides, setSlide] = useState([
    {
      question: '',
      options: [],
    },
  ]);
  const [currentSlide, setCurrentSlide] = useState({
    index: 0,
    question: '',
    options: [],
  });
  const [dataChange, setDataChange] = useState();
  const token = 'Bearer ' + localStorage.getItem('token');
  const [slideInfo, setSlideInfo] = useState({
    slides: [],
  });

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await axios.get(
        `http://localhost:3001/presentation/${PresentationId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // setPresentation(res.data.presentation);
      setSlide(res.data.presentation.slides);
      setCurrentSlide({ index: 0, ...res.data.presentation.slides[0] });
      // ...
    }
    fetchData();
  }, []);
  // const [quizInfo]
  const handleDemo = () => {
    navigate(`/demo/${PresentationId}`);
  };

  const handleNewSlide = () => {
    const defaultSlide = {
      question: '',
      options: [],
    };
    setSlide((arr) => [...arr, defaultSlide]);
  };
  const handleSave = async () => {
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
    let arr = Array.from({ length: slides.length }, (v, i) => (v = slides[i]));

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
          <div className='slide__container'>
            <div className='slide__nav'>
              {slides.map((value, index) => {
                return (
                  <Slide
                    key={index}
                    setInfoSlide={setInfoSlide}
                    slideIndex={index}
                    slideInfo={slides[index]}
                    slides={slides}
                    currentSlide={setCurrentSlide}
                    currentSlideInfo={currentSlide}
                    changeData={dataChange}
                  />
                );
              })}
            </div>

            <Edit slideInfoDetail={currentSlide} changeData={setDataChange} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
