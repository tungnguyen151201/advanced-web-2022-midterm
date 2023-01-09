import './Present.css';

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
      </div>
    </div>
  );
}
