import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { AiOutlineComment } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import './AccordionQuestion.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
import useGlobalState from '../../context/useAuthState';
import { useState } from 'react';
function AccordionQuestion({ idPresent, questions }) {
  // console.log(questions);
  const [show, setShow] = useState(false);
  const [state] = useGlobalState();
  const handleMarkQuestion = (index) => {
    const newQuestion = questions.map((e, i) => {
      if (i === index) {
        return {
          user: e.user,
          content: e.content,
          isReplied: true,
          vote: e.vote,
          createdAt: e.createdAt,
        };
      }
      return e;
    });
    axios
      .patch(
        `http://localhost:3001/presentation/edit/${idPresent}`,
        {
          questions: newQuestion,
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setShow(true);
        }
        //setPresentation(res.data.presentation);
      });
  };
  return (
    <div>
      {questions.map((e, index) => {
        return (
          <Accordion className='accordion__container' key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className='accordion__icon' />}
              aria-controls='panel1a-content'
            >
              <p className='accordion__question'>
                <AiOutlineComment className='accordion__icon' />
                {e.content}
              </p>
              <Button onClick={() => handleMarkQuestion(index)}>
                MarkQuestion
              </Button>
            </AccordionSummary>
          </Accordion>
        );
      })}
      <ToastContainer className='chat__toast p-3' position='bottom-center'>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          bg='success'
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Notify</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>
            MarkQuestion Successful!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default AccordionQuestion;
