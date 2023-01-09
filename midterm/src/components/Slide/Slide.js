import './Slide.css';
export default function Slide({ slideIndex, currentSlide, onClick }) {
  return (
    <div className="slide__container" onClick={onClick}>
      <div className={slideIndex === currentSlide ? "slide slide--active" : "slide slide"}>
        <p>{slideIndex + 1}</p>
        <div className="slide__demo">Slide</div>
      </div>
    </div>
  );
}
