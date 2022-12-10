import './Quiz.css';
import React, { useState } from 'react';
const Quiz = (props) => {
  return (
    <div className="quiz__container">
      <div className="quiz__header">
        <button className="quiz__btn quiz__btn--b">+ New slide</button>
        <button className="quiz__btn quiz__btn--g m-r">Import PowerPoint</button>
        <button className="quiz__btn">Save</button>
        <button className="quiz__btn quiz__btn--g">Share</button>
        <button className="quiz__btn quiz__btn--b">Present</button>
      </div>
    </div>
  );
};

export default Quiz;
