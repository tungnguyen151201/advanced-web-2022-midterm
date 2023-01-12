import Present from '../Present/Present';
import './Edit.css';

export default function Edit({
  slideInfoDetail,
  setSlideInfoDetail,
  setDefaultSlide,
  defaultSlide,
}) {
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
  const handleChangeType = (e) => {
    if (e.target.value === 'Heading') {
      setDefaultSlide({
        type: 'Heading',
        question: 'Heading',
        contents: 'Subheading',
        options: ['Option 1'],
      });
    } else if (e.target.value === 'Paragraph') {
      setDefaultSlide({
        type: 'Paragraph',
        question: 'Paragraph',
        contents: 'Subheading',
        options: ['Option 1'],
      });
    } else {
      setDefaultSlide({
        type: 'Multiple',
        question: 'Question 1',
        contents: 'Your Question',
        options: ['Option 1', 'Option 2', 'Option 3'],
      });
    }
  };
  return (
    <div className='edit__container'>
      <div className='edit'>
        <p className='edit__title'>Slide type</p>
        <select className='edit__select' onChange={(e) => handleChangeType(e)}>
          <option value='Multiple' selected>
            Multiple Choice
          </option>
          <option value='Heading'>Heading</option>
          <option value='Paragraph'>Paragraph</option>
        </select>
        <p className='edit__title'>{defaultSlide.type}</p>

        <input
          type='text'
          className='edit__input'
          value={slideInfoDetail.question}
          onChange={handleChangeQuestion}
        />
        <p className='edit__title'>{defaultSlide.contents}</p>
        <div className='edit__options'>
          {defaultSlide.type !== 'Multiple' ? (
            <input
              // key={index}
              type='text'
              value={slideInfoDetail.options[0]}
              className='edit__input'
              onChange={(e) => {
                handleChangeOptions(0, e);
              }}
            />
          ) : (
            slideInfoDetail.options.map((value, index) => {
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
            })
          )}
        </div>
        {defaultSlide.type === 'Multiple' && (
          <button className='btn__add quiz__btn--g' onClick={handleNewOptions}>
            + Add option
          </button>
        )}
      </div>

      <Present
        question={slideInfoDetail.question}
        options={slideInfoDetail.options}
        defaultSlide={defaultSlide}
      />
    </div>
  );
}
