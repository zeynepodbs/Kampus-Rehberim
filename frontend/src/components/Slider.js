import React, { useState } from "react";
import "./Slider.css"; // stil dosyası

const images = [
  "/img/vizehaftasi.png",
  "/img/baharsenligi.png",
  "/img/kariyergunleri.png",
  "/img/kayityenileme.png",
  "/img/tiyatrogosterisi.png",
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>‹</button>
      <img src={images[current]} alt="slider" className="slider-image" />
      <button className="next" onClick={nextSlide}>›</button>
    </div>
  );
}
