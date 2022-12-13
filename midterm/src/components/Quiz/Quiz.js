import './Quiz.css';
import React, { useState } from 'react';
import Slide from '../Slide/Slide';
import Present from '../Present/Present';
import Edit from '../Edit/Edit';
import { useNavigate } from 'react-router-dom';

const Quiz = (props) => {
  const navigate = useNavigate();
  const handleDemo = () => {
    navigate('/demo');
  };
  return (
    <div className="quiz__container">
      <div className="quiz__header">
        <button className="quiz__btn quiz__btn--b">+ New slide</button>
        <button className="quiz__btn quiz__btn--g m-r">Import PowerPoint</button>
        <button className="quiz__btn black">Save</button>
        <button className="quiz__btn quiz__btn--g">Share</button>
        <button className="quiz__btn quiz__btn--b" onClick={() => handleDemo()}>
          Demo
        </button>
      </div>
      <main className="quiz__content">
        <div className="quiz__slide">
          <Slide />
        </div>
        <div className="quiz__present">
          <Present />
        </div>
        <div className="quiz__edit">
          <Edit />
        </div>
      </main>
    </div>
  );
};

export default Quiz;
