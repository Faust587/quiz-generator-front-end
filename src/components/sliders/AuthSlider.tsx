import './sliderStyles.scss'
import { useEffect, useState } from 'react'
import sliderText from '../../assets/data/authSliderText.json'

export const AuthSlider = () => {
  const [position, setPosition] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (position < sliderText.length - 1) {
        setPosition(prevState => prevState + 1)
      } else {
        setPosition(0)
      }
    }, 4000)
    return () => {
      clearInterval(interval)
    }
  }, [position])

  return (
    <div className="slider">
      <div
        className="slider-container"
        style={ { left: `calc(-1 * 100% * ${position})` } }
      >
        {
          sliderText.map((text) => {
            return (
              <div
                key={ text }
                className="slider-item"
              >
                { text }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
