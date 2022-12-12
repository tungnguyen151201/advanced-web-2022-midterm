import { useNavigate } from 'react-router-dom';
import './Demo.css';

const Demo = () => {
  const navigate = useNavigate();
  return (
    <div className="demo__container">
      <div className="demo__content">
        <p className="demo__title">Link the test</p>
        <div className="demo__link">
          <input className="demo__input" value="haha/test" />
          <button className="btn__copy">Copy link</button>
        </div>
        <h1 className="demo__question">What's your name?</h1>
        <div className="demo__chart"></div>
      </div>
    </div>
  );
};

export default Demo;
