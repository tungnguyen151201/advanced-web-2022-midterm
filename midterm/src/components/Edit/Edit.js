import { useState } from 'react';
import Present from '../Present/Present';
import './Edit.css';
export default function Edit() {
  const [questions, setQuestions] = useState('');
  const [options, setOptions] = useState('');
  const [newoptions, createOptions] = useState([]);
  // const handleInputQuetions = () => {};
  const handleNewOptions = () => {
    createOptions((arr) => [...arr, `${options}`]);
  };
  return (
    <div className='edit__container'>
      <div className='edit'>
        <p className='edit__title'>Slide type</p>
        <select className='edit__select'>
          <option value='multiple'>Multiple Choice</option>
          <option value='type2'>Type 2</option>
          <option value='type3'>Type 3</option>
        </select>
        <p className='edit__title'>Your question</p>
        <input
          type='text'
          className='edit__input'
          onChange={(e) => {
            setQuestions(e.target.value);
          }}
        />
        <p className='edit__title'>Options</p>
        <div className='edit__options'>
          {newoptions.map((value, index) => {
            return (
              <input
                key={index}
                type='text'
                className='edit__input'
                onChange={(e) => {
                  setOptions(e.target.value);
                }}
              />
            );
          })}
        </div>
        <button className='btn__add quiz__btn--g' onClick={handleNewOptions}>
          + Add option
        </button>
      </div>

      <Present question={questions} options={newoptions} />
    </div>
  );
}
