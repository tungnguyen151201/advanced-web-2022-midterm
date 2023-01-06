import { useEffect, useState } from 'react';
import Present from '../Present/Present';
import './Edit.css';

export default function Edit({ slideInfoDetail, changeData }) {
  const [questions, setQuestions] = useState(slideInfoDetail.question);
  const [options, setOptions] = useState(slideInfoDetail.options);

  const handleNewOptions = () => {
    setOptions((arr) => [...arr, ``]);
  };
  useEffect(() => {
    setQuestions(slideInfoDetail.question);
    setOptions(slideInfoDetail.options);
  }, [slideInfoDetail]);

  const handleChangeOptions = (index, e) => {
    const newArray = options.map((item, i) => {
      if (index === i) {
        return e.target.value;
      } else {
        return item;
      }
    });
    setOptions(newArray);
    changeData({ questions, options });
  };
  return (
    <div className="edit__container" onChange={handleChangeDetail}>
      <div className="edit">
        <p className="edit__title">Slide type</p>
        <select className="edit__select">
          <option value="multiple">Multiple Choice</option>
          <option value="type2">Type 2</option>
          <option value="type3">Type 3</option>
        </select>
        <p className="edit__title">Your question</p>
        <input
          type="text"
          className="edit__input"
          type='text'
          className='edit__input'
          value={questions}
          onChange={(e) => {
            setQuestions(e.target.value);
          }}
        />
        <p className='edit__title'>Options</p>
        <div className='edit__options'>
          {options.map((value, index) => {
            return (
              <input
                key={index}
                type='text'
                value={value}
                className='edit__input'
                onChange={(e) => {
                  handleChangeOptions(index, e);
                }}
              />
            );
          })}
        </div>
        <button className="btn__add quiz__btn--g" onClick={handleNewOptions}>
          + Add option
        </button>
      </div>

      <Present question={questions} options={options} />
    </div>
  );
}
