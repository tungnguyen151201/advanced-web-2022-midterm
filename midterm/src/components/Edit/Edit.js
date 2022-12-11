import './Edit.css';
export default function Edit() {
  return (
    <>
      <p className="edit__title">Slide type</p>
      <select className="edit__select">
        <option value="multiple">Multiple Choice</option>
        <option value="type2">Type 2</option>
        <option value="type3">Type 3</option>
      </select>
      <p className="edit__title">Your question</p>
      <input type="text" value={"What's your name?"} className="edit__input" />
      <p className="edit__title">Options</p>
      <div className="edit__options">
        <input type="text" value={'Answer 1'} className="edit__input" />
        <input type="text" value={'Answer 2'} className="edit__input" />
        <input type="text" value={'Answer 3'} className="edit__input" />
        <input type="text" value={'Answer 4'} className="edit__input" />
      </div>
      <button className="btn__add quiz__btn--g">+ Add option</button>
    </>
  );
}
