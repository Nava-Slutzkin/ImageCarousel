import { useState } from 'react'
import Carousel from './Carousel/Carousel.jsx'
import RecipesCarousel from './RecipesCarousel/RecipesCarousel.jsx'
import './App.css'

const images = [
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=85',
]

function App() {
  const [showRecipes, setShowRecipes] = useState(true)

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
          <p className="intro">ארבעה נופים, נשימה אחת עמוקה. בחרו תמונה ויצאו לרגע מהשגרה.</p>
        </div>
        <Carousel images={images} intervalSeconds={3} />
      </section>

      <section className="recipes-section" aria-labelledby="recipes-title">
        <div className="recipes-heading">
          <div>
            <p className="eyebrow"><span></span> תמונות מהשרת</p>
            <h2 id="recipes-title">מתכונים שכיף לראות</h2>
          </div>
          <button
            className="recipes-toggle"
            type="button"
            onClick={() => setShowRecipes((visible) => !visible)}
            aria-expanded={showRecipes}
          >
            {showRecipes ? 'הסתר קרוסלה' : 'הצג קרוסלה'}
          </button>
        </div>
        {showRecipes && <RecipesCarousel />}
      </section>

      <footer className="page-footer">
        <span>לאסוף רגעים, לא רק מקומות.</span>
        <span className="footer-mark" aria-hidden="true">●</span>
      </footer>
    </main>
  )
}

export default App
