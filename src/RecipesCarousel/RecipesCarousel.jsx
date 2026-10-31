import { useEffect, useState } from 'react'
import Carousel from '../Carousel/Carousel.jsx'
import './RecipesCarousel.css'

const recipesUrl = 'https://dummyjson.com/recipes?limit=6&select=name,image'

function RecipesCarousel() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadImages() {
      try {
        const response = await fetch(recipesUrl, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`טעינת המתכונים נכשלה (${response.status})`)
        }

        const data = await response.json()
        setImages(data.recipes.map((recipe) => recipe.image))
        setLoading(false)
      } catch (requestError) {
        if (requestError.name === 'AbortError') return

        setError(requestError.message)
        setLoading(false)
      }
    }

    loadImages()
    return () => controller.abort()
  }, [])

  return (
    <div className="recipes-carousel">
      {loading && <div className="carousel-message">טוען מתכונים...</div>}
      {error && <div className="carousel-message error">שגיאה: {error}</div>}
      {!loading && !error && <Carousel images={images} intervalSeconds={4} />}
    </div>
  )
}

export default RecipesCarousel
