import axios from 'axios';
import './Quiz.css';
import '../Slide/Slide.css';
import React, { useEffect, useState } from 'react';
import Slide from '../Slide/Slide';
import Edit from '../Edit/Edit';
import { BsPlayFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import InviteCoownner from './InviteCoownner';
import ListCoowner from './ListCoowner';
import useGlobalState from '../../context/useAuthState';

const Quiz = () => {
  const { PresentationId } = useParams();
  const [state] = useGlobalState();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([
    {
      question: '',
      options: [''],
    },
  ]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [loadStatus, setLoadStatus] = useState({ status: false, message: '' });
  const [defaultSlide, setDefaultSlide] = useState({
    type: 'Multiple',
    question: 'Question 1',
    options: ['Option 1', 'Option 2', 'Option 3'],
  });
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:3001/presentation/${PresentationId}`,
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
      if (res.data.status) {
        setLoadStatus({
          status: true,
        });
        setSlides(res.data.presentation.slides);
      } else {
        setLoadStatus({
          status: false,
          message: res.data.message,
        });
      }
    }
    fetchData();
  }, [PresentationId, state.token]);

  const handleDemo = () => {
    navigate(`/demo/${PresentationId}`);
  };

  const handleNewSlide = async () => {
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
    const res = await axios.patch(
      `http://localhost:3001/presentation/edit/${PresentationId}`,
      {
        slides,
      },
      {
        headers: {
          Authorization: state.token,
        },
      }
    );
    if (res.data.status) {
      alert('Save success');
    } else {
      alert(res.data.message);
    }
  };
  return loadStatus.status ? (
    <div className='quiz__container'>
      <div className='quiz__header'>
        <button className='quiz__btn quiz__btn--b ' onClick={handleNewSlide}>
          + New slide
        </button>

        <button
          className='quiz__btn quiz__btn--save black m-r'
          onClick={handleSave}
        >
          Save
        </button>
        <InviteCoownner idPresent={PresentationId} />
        <ListCoowner idPresent={PresentationId} />
        <button
          className='quiz__btn quiz__btn--present quiz__btn--b'
          onClick={() => handleDemo()}
        >
          <BsPlayFill className='quiz__icon-play' /> Present
        </button>
      </div>
      <main className='quiz__content'>
        <div className='quiz__slide'>
          <div className='slide__container'>
            <div className='slide__nav'>
              {slides.map((_, index) => {
                return (
                  <Slide
                    slideIndex={index}
                    currentSlide={slideIndex}
                    onClick={() => setSlideIndex(index)}
                  />
                );
              })}
            </div>
            <Edit
              setDefaultSlide={setDefaultSlide}
              slideInfoDetail={slides[slideIndex]}
              setSlideInfoDetail={handleUpdateSlides}
              defaultSlide={defaultSlide}
            />
          </div>
        </div>
      </main>
    </div>
  ) : (
    loadStatus.message
  );
};

export default Quiz;
