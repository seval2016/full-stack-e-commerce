import SliderItem from './SliderItem';
import './sliders.css';

const Sliders = () => {
  return (
     <section className="slider">
    <div className="slider-elements">
     <SliderItem />
      <div className="slider-buttons">
        <button onclick="plusSlide(-1)">
          <i className="bi bi-chevron-left"></i>
        </button>
        <button onclick="plusSlide(1)">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="slider-dots">
        <button className="slider-dot active">
          <span></span>
        </button>
        <button className="slider-dot">
          <span></span>
        </button>
        <button className="slider-dot">
          <span></span>
        </button>
      </div>
    </div>
  </section>
  )
}

export default Sliders
