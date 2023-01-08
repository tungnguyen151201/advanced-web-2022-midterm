import './PresentItem.css';
import { BsFillCaretRightSquareFill } from 'react-icons/bs';
import ThreeDotsMenu from '../ThreeDotsMenu/ThreeDotsMenu';

const PresentItem = ({onClick, id, name, owner, createdAt }) => {
  const d = new Date(createdAt);
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  return (
    <div className="prItem__container">
      <p className="prItem__name" onClick={onClick}>
        <BsFillCaretRightSquareFill className="play__icon"/>
        {name}
      </p>
      <p className="prItem__owner">{owner}</p>
      <p className="prItem__created">
        {date}
        <ThreeDotsMenu id={id} />
      </p>
    </div>
  );
};

export default PresentItem;
