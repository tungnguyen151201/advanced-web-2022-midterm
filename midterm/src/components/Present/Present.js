import './Present.css';
import BoxChat from '../ChatBox/BoxChat';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
export default function Present() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='present'>
        <p className='question'>Question 1: What's your name?</p>
        <div className='answers'>
          <div className='answer'>Answer 1</div>
          <div className='answer'>Answer 2</div>
          <div className='answer'>Answer 3</div>
          <div className='answer'>Answer 4</div>
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
      <button className='btn__present'>Pressent notes</button>
    </>
  );
}
