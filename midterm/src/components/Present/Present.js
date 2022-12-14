import { useState } from 'react';
import './Present.css';
import Edit from '../Edit/Edit';

export default function Present({ question, options }) {
  return (
    <div className='present__container'>
      <div className='present'>
        <p className='question'>Question 1: {question}</p>
        <div className='answers'>
          {options.map((value, index) => {
            return (
              <div key={index} className='answer'>
                {value}
              </div>
            );
          })}
        </div>
        <button className='btn__present'>Pressent notes</button>
      </div>
    </div>
  );
}
