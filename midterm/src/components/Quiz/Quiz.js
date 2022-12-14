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
        <button className="quiz__btn quiz__btn--b m-r">+ New slide</button>
        <button className="quiz__btn black">Save</button>
        <button className="quiz__btn quiz__btn--b" onClick={() => handleDemo()}>
          Demo
        </button>
      </div>
      <main className="quiz__content">
        <Slide />
      </main>
    </div>
  );
};

export default Quiz;
