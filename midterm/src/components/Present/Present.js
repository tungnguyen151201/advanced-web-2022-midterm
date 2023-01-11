import './Present.css';

export default function Present({ question, options, defaultSlide }) {
  console.log(options[0]);
  return (
    <div className='present__container'>
      <div className='present'>
        <p className='question'>
          {defaultSlide.type}: {question}
        </p>
        <div className='answers'>
          {defaultSlide.type !== 'Multiple' ? (
            <div className='answer'>{options[0]}</div>
          ) : (
            options.map((value, index) => {
              return (
                <div key={index} className='answer'>
                  {value}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
