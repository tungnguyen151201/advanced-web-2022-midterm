import ThreeDotsMenu from '../ThreeDotsMenu/ThreeDotsMenu';
import '../Quiz/Quiz.css';
import './MyPresentations.css';
import PresentItem from './PresentItem';

const MyPresentations = (props) => {
  return (
    <div className="mypre__container">
      <h1>My presentations</h1>
      <button className="quiz__btn quiz__btn--b m-r">+ New presentation</button>
      <div className="mypre__list">
        <div className="mypre__titles">
          <p>Name</p>
          <p>Owner</p>
          <p>Created</p>
        </div>
        <hr className="mypre__line" />
        <div className="mypre__items">
          <PresentItem />
        </div>
      </div>
    </div>
  );
};

export default MyPresentations;
