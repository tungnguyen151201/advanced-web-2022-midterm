import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { AiOutlineComment } from 'react-icons/ai';
import './AccordionQuestion.css';

function AccordionQuestion() {
  return (
    <Accordion className="accordion__container">
      <AccordionSummary expandIcon={<ExpandMoreIcon className="accordion__icon" />} aria-controls="panel1a-content">
        <p className="accordion__question">
          <AiOutlineComment className="accordion__icon" />
          Are you ok?
        </p>
      </AccordionSummary>
      <AccordionDetails className="accordion__answer">
        <input type="text" placeholder="Give the answer" className='accordion__input' />
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionQuestion;
