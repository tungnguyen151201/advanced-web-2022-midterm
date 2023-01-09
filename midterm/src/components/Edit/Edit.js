import Present from '../Present/Present';
import './Edit.css';

export default function Edit({ slideInfoDetail, setSlideInfoDetail }) {
  console.log(slideInfoDetail);
  const handleChangeQuestion = (e) => {
    setSlideInfoDetail({
      ...slideInfoDetail,
      question: e.target.value,
      options: slideInfoDetail.options,
    });
  };

  const handleNewOptions = () => {
    setSlideInfoDetail({
      ...slideInfoDetail,
      question: slideInfoDetail.question,
      options: [...slideInfoDetail.options, ''],
    });
  };

  const handleChangeOptions = (index, e) => {
    const newArray = slideInfoDetail.options.map((item, i) => {
      if (index === i) {
        return e.target.value;
      } else {
        return item;
      }
    });
    setSlideInfoDetail({
      ...slideInfoDetail,
      question: slideInfoDetail.question,
      options: newArray,
    });
  };

  return (
    <div className="edit__container">
      <div className="edit">
        <p className="edit__title">Slide type</p>
        <select className="edit__select">
          <option value="multiple">Multiple Choice</option>
          <option value="type2">Heading</option>
          <option value="type3">Paragraph</option>
        </select>
        <p className="edit__title">Your question</p>

        <input
          type="text"
          className="edit__input"
          value={slideInfoDetail.question}
          onChange={handleChangeQuestion}
        />
        <p className="edit__title">Options</p>
        <div className="edit__options">
          {slideInfoDetail.options.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                value={value}
                className="edit__input"
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

      <Present
        question={slideInfoDetail.question}
        options={slideInfoDetail.options}
      />
    </div>
  );
}
