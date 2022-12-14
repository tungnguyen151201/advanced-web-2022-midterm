import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import BarChart from '../BarChart/BarChart';
import BoxChat from '../ChatBox/BoxChat';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import './Demo.css';
const Demo = () => {
  const [open, setOpen] = useState(false);
  const link = 'http://localhost:3000/voting';
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to the clipboard');
  };
  return (
    <div className='demo__container'>
      <div className='demo__content'>
        <p className='demo__title'>Link the test</p>
        <div className='demo__link'>
          <input className='demo__input' value={link} />
          <button className='btn__copy' onClick={handleCopy}>
            Copy link
          </button>
        </div>
        <h1 className='demo__question'>What's your name?</h1>

        <div className='demo__chart'>
          <BarChart />
        </div>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls='example-collapse-text'
          aria-expanded={open}
        >
          Box Chat
        </Button>
        <Collapse in={open}>
          <div id='example-collapse-text'>
            <BoxChat></BoxChat>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Demo;
