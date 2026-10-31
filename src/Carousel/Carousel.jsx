import { useEffect, useState } from 'react'
import CarouselItem from '../CarouselItem/CarouselItem.jsx'
import './Carousel.css'
import './Carousel.layout.css'

function Carousel({ images, intervalSeconds = 3 }) {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (images.length < 2 || intervalSeconds <= 0) return undefined

    const intervalId = window.setInterval(() => {
      setSelected((previous) => (previous + 1) % images.length)
    }, intervalSeconds * 1000)

    return () => window.clearInterval(intervalId)
  }, [selected, intervalSeconds, images.length])

  function move(step) {
    setSelected((previous) => (previous + step + images.length) % images.length)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') move(-1)
    if (event.key === 'ArrowRight') move(1)
    if (event.key === 'Home') setSelected(0)
    if (event.key === 'End') setSelected(images.length - 1)
  }

  if (!images.length) {
    return <div className="carousel-message">אין תמונות להצגה</div>
  }

  return (
    <div
      className="carousel-frame"
      role="region"
      aria-roledescription="קרוסלה"
      aria-label="קרוסלת תמונות"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="carousel">
        <CarouselItem
          key={images[selected]}
          src={images[selected]}
          alt={`תמונה ${selected + 1} מתוך ${images.length}`}
        />
        <button
          className="carousel-arrow prev"
          type="button"
          onClick={() => move(-1)}
          aria-label="לתמונה הקודמת"
          title="לתמונה הקודמת"
        >
          <span aria-hidden="true">❮</span>
        </button>
        <button
          className="carousel-arrow next"
          type="button"
          onClick={() => move(1)}
          aria-label="לתמונה הבאה"
          title="לתמונה הבאה"
        >
          <span aria-hidden="true">❯</span>
        </button>
        <div className="carousel-dots" role="group" aria-label="בחירת תמונה">
          {images.map((image, index) => (
            <button
              className={`carousel-dot${index === selected ? ' active' : ''}`}
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`תמונה ${index + 1}`}
              aria-pressed={index === selected}
            />
          ))}
        </div>
      </div>
      <p className="carousel-counter" aria-live="polite">
        תמונה {selected + 1} מתוך {images.length}
      </p>
    </div>
  )
}

export default Carousel
