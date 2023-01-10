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
  const [slides, setSlides] = useState([
    {
      question: '',
      options: [''],
    },
  ]);
  const [slideIndex, setSlideIndex] = useState(0);

  const token = 'Bearer ' + localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:3001/presentation/${PresentationId}`, {
        headers: {
          Authorization: token,
        },
      });
      setSlides(res.data.presentation.slides);
    }
    fetchData();
  }, [PresentationId, token]);

  const handleDemo = () => {
    navigate(`/demo/${PresentationId}`);
  };

  const handleNewSlide = async () => {
    const defaultSlide = {
      question: 'Question 1',
      options: ['Option 1', 'Option 2', 'Option 3'],
    };
    setSlides([...slides, defaultSlide]);
    setSlideIndex(slides.length);
  };

  const handleUpdateSlides = (slideDetail) => {
    const newArray = slides.map((item, i) => {
      if (slideIndex === i) {
        return slideDetail;
      } else {
        return item;
      }
    });
    setSlides(newArray);
  };

  const handleSave = async () => {
    await axios.patch(
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
    alert('Save success!');
  };
  return (
    <div className="quiz__container">
      <div className="quiz__header">
        <button className="quiz__btn quiz__btn--b m-r" onClick={handleNewSlide}>
          + New slide
        </button>
        <button className="quiz__btn black" onClick={handleSave}>
          Save
        </button>
        <button className="quiz__btn quiz__btn--b" onClick={() => handleDemo()}>
          Demo
        </button>
      </div>
      <main className="quiz__content">
        <div className="quiz__slide">
          <div className="slide__container">
            <div className="slide__nav">
              {slides.map((_, index) => {
                return <Slide slideIndex={index} currentSlide={slideIndex} onClick={() => setSlideIndex(index)} />;
              })}
            </div>
            <Edit slideInfoDetail={slides[slideIndex]} setSlideInfoDetail={handleUpdateSlides} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
