import { BsFillEmojiDizzyFill, BsArrowRightShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './WarningLogin.css';

export default function WarningLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div className="wl__container">
      <BsFillEmojiDizzyFill className="wl__icon" />
      <h1 className="wl__title">Opps!</h1>
      <p className="wl__infor">You have not login yet!</p>
      <div className="wl__btn" onClick={handleLogin}>
        Go to login <BsArrowRightShort className="wl__arrow" />
      </div>
    </div>
  );
}
