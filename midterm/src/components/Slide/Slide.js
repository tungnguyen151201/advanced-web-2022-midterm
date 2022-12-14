import './Slide.css';
import Edit from '../Edit/Edit';

export default function Slide() {
  return (
    <div className="slide__container">
      <div className="slide slide--active">
        <p>1</p>
        <div className="slide__demo">Demo</div>
      </div>
      <Edit />
    </div>
  );
}
