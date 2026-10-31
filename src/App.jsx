import { useState } from 'react'
import './App.css'
import './Carousel.css'

const slides = [
  {
    title: 'אור ראשון מעל האגם',
    location: 'האלפים של סלובניה',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85',
    alt: 'אגם הררי שקט מוקף יער ופסגות בשעת בוקר',
    number: '01',
  },
  {
    title: 'שקט בין הפסגות',
    location: 'הדולומיטים, איטליה',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85',
    alt: 'רכס הרים גבוה משתקף במי אגם צלולים',
    number: '02',
  },
  {
    title: 'המדבר מתעורר',
    location: 'דרום-מערב ארצות הברית',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85',
    alt: 'נוף מדברי רחב בגווני אדמה תחת שמיים פתוחים',
    number: '03',
  },
  {
    title: 'רגע לפני השקיעה',
    location: 'חוף האוקיינוס השקט',
    image:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=85',
    alt: 'גלי ים כחולים נעים לעבר חוף באור רך',
    number: '04',
  },
  {
    title: 'שביל בתוך הערפל',
    location: 'יער צפוני',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1800&q=85',
    alt: 'אור בוקר חודר דרך ערפל מעל יער ירוק',
    number: '05',
  },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % slides.length)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') showPrevious()
    if (event.key === 'ArrowRight') showNext()
    if (event.key === 'Home') setActiveIndex(0)
    if (event.key === 'End') setActiveIndex(slides.length - 1)
  }

  return (
    <main className="page-shell" dir="rtl">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="מבט, חזרה לראש העמוד">
          <span className="wordmark-mark" aria-hidden="true">מ</span>
          <span>מבט</span>
        </a>
        <span className="topbar-note">אלבום מס׳ 01 <span aria-hidden="true">/</span> מקומות שנשארים איתנו</span>
      </header>

      <section className="gallery" id="top" aria-labelledby="page-title">
        <div className="gallery-heading">
          <p className="eyebrow"><span></span> יומן מסע מצולם</p>
          <h1 id="page-title">רגעים של <span>מרחב</span></h1>
          <p className="intro">חמישה נופים, נשימה אחת עמוקה. בחרו תמונה ויצאו לרגע מהשגרה.</p>
        </div>

        <div
          className="carousel-frame"
          role="region"
          aria-roledescription="קרוסלה"
          aria-label="גלריית נופים"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="carousel">
            <div className="carousel-item" key={activeSlide.number}>
              <img src={activeSlide.image} alt={activeSlide.alt} />
              <div className="slide-shade" aria-hidden="true"></div>
              <div className="slide-copy" dir="rtl" aria-live="polite">
                <span className="slide-location">{activeSlide.location}</span>
                <h2>{activeSlide.title}</h2>
              </div>
              <span className="slide-number" aria-hidden="true">{activeSlide.number} / 05</span>
            </div>
            <button
              className="carousel-arrow prev"
              type="button"
              onClick={showPrevious}
              aria-label="לתמונה הקודמת"
              title="לתמונה הקודמת"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              className="carousel-arrow next"
              type="button"
              onClick={showNext}
              aria-label="לתמונה הבאה"
              title="לתמונה הבאה"
            >
              <span aria-hidden="true">→</span>
            </button>
            <div className="carousel-dots" role="group" aria-label="בחירת תמונה">
              {slides.map((slide, index) => (
                <button
                  className={`carousel-dot${index === activeIndex ? ' active' : ''}`}
                  key={slide.number}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`תמונה ${index + 1}: ${slide.title}`}
                  aria-pressed={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="gallery-meta" aria-live="polite">
          <span>{activeSlide.location}</span>
          <span className="meta-divider" aria-hidden="true"></span>
          <span>תמונה {activeIndex + 1} מתוך {slides.length}</span>
        </div>
      </section>

      <footer className="page-footer">
        <span>לאסוף רגעים, לא רק מקומות.</span>
        <span className="footer-mark" aria-hidden="true">●</span>
      </footer>
    </main>
  )
}

export default App
