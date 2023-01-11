import BoxChat from '../ChatBox/BoxChat';
import Collapse from 'react-bootstrap/Collapse';
import { SiSimpleanalytics } from 'react-icons/si';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from 'react';
import './ListAnswer.css';
import AnswerItem from './AnswerItem';

export default function ListAnswer({ answers, options }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="listAnswer__btn" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
        <SiSimpleanalytics className="chat__icon" />
      </Button>
      <Collapse in={open}>
        <div className="listAnswer__container">
          <p className="listAnswer__title">Analys the answers</p>
          {answers.map(answer =>
            <AnswerItem answer={answer} options={options} />
          )}
        </div>
      </Collapse>
    </>
  );
}
