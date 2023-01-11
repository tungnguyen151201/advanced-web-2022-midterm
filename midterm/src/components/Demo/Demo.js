import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BarChart from '../BarChart/BarChart';
import BoxChat from '../ChatBox/BoxChat';
import Collapse from 'react-bootstrap/Collapse';
import { BsFillChatTextFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import './Demo.css';
import { SocketContext } from '../../context/socket';
import useGlobalState from '../../context/useAuthState';
import { useNavigate } from 'react-router-dom';
import AccordionQuestion from '../AccordionQuestion/AccordionQuestion';
import ListAnswer from '../ListAnswer/ListAnswer';

const Demo = () => {
  const navigate = useNavigate();
  const [state] = useGlobalState();
  const { id, groupId } = useParams();
  const socket = useContext(SocketContext);
  const [open, setOpen] = useState(false);

  const [loadStatus, setLoadStatus] = useState({ status: false, message: '' });

  const [presentation, setPresentation] = useState({
    name: 'test',
    owner: 'test',
    slides: [
      {
        question: '',
        options: ['', '', ''],
        answers: [],
      },
    ],
    questions: [
      {
        user: ' ',
        content: '',
        isReplied: false,
        vote: 0,
      },
    ],
  });
  const [slide, setSlide] = useState(0);

  const link = groupId ? `http://localhost:3000/voting/${id}/group/${groupId}` : `http://localhost:3000/voting/${id}`;

  socket.emit('join-room', id);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to the clipboard');
  };

  const handleChangeSlide = async (event) => {
    if (event.keyCode === 27) {
      // ESC
      await axios.patch(
        `http://localhost:3001/presentation/edit/${id}`,
        {
          status: false,
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
      navigate(`/quiz/${id}`);
    }
    if (event.keyCode === 37) {
      //previous
      if (slide === 0) {
        return;
      }
      setSlide((slide) => slide - 1);
      await axios.patch(
        `http://localhost:3001/presentation/edit/${id}`,
        {
          ...presentation,
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
      socket.emit('change-slide', slide - 1);
    }
    if (event.keyCode === 39) {
      //next
      if (slide === presentation.slides.length - 1) {
        return;
      }
      setSlide((slide) => slide + 1);
      await axios.patch(
        `http://localhost:3001/presentation/edit/${id}`,
        {
          ...presentation,
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
      socket.emit('change-slide', slide + 1);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation/${id}`, {
        headers: {
          Authorization: state.token,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setLoadStatus({
            status: true,
          });
          setPresentation(res.data.presentation);
        } else {
          setLoadStatus({
            status: false,
            message: res.data.message,
          });
        }
      });
  }, [id, state.token]);

  useEffect(() => {
    socket.on('submit-answer', async (data) => {
      setPresentation((presentation) => ({
        ...presentation,
        slides: presentation.slides.map((s, index) => {
          if (index === slide) {
            return {
              ...s,
              answers: [...s.answers, { _id: data.userId, answer: data.answer }],
            };
          } else return s;
        }),
      }));
    });
    return () => {
      socket.off('submit-answer');
    };
  }, [slide, socket]);

  const countAnswers = (answers) => {
    let result = Array.from({ length: presentation.slides[slide].options.length }, (v) => (v = 0));

    answers.forEach((e) => {
      result[parseInt(e.answer)] += 1;
    });
    return result;
  };

  return loadStatus.status ? (
    <div
      className="demo__container"
      onKeyDown={handleChangeSlide}
      tabIndex={-1}
    >
      <div className="demo__content">
        <p className="demo__title">Link the test</p>
        <div className="demo__link">
          <input className="demo__input" value={link} />
          <button className="btn__copy" onClick={handleCopy}>
            Copy link
          </button>
        </div>
        <h1 className="demo__question">
          {presentation.slides[slide].question}
        </h1>

        <div className="demo__chart">
          <BarChart options={presentation.slides[slide].options} answers={countAnswers(presentation.slides[slide].answers)} />
        </div>

        <ListAnswer answers={presentation.slides[slide].answers} options={presentation.slides[slide].options} />

        {/* <Alert hidden={notify === 0}> Have new message{notify}</Alert> */}
        <Button
          className="chat__btn"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <BsFillChatTextFill className="chat__icon" />
        </Button>
        <Collapse in={open}>
          <div id='example-collapse-text'>
            <BoxChat></BoxChat>
          </div>
        </Collapse>
        {presentation.questions.length !== 0 && <h1>List questions</h1>}
        <AccordionQuestion idPresent={id} questions={presentation.questions} />

        {/* <NotifyMessage notify={notify}></NotifyMessage> */}
      </div>
    </div>
  ) : loadStatus.message;
};

export default Demo;
