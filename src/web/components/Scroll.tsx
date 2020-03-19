import React, { useEffect } from 'react'

interface IScrollProps {
  threshold?: number
  onBoundaryReached: () => void
}

/**
 * Scroll allows you to easily trigger callbacks based on how far a user has scrolled
 * on the page. Useful for things like lazy loading data
 *
 * ```javascript
 *  <Scroll onBoundaryReached={getMoreData} threshold={0}>
 *    <div>HTML</div>
 *  </Scroll>
 * ```
 */
const Scroll: React.FC<IScrollProps> = ({
  children,
  onBoundaryReached,
  threshold = 200
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const {
        documentElement: { offsetHeight: bottom, scrollTop }
      } = document
      const currentYPosition = window.innerHeight + scrollTop

      // If we're within 100px of the bottom, trigger our handler
      if (currentYPosition >= bottom - threshold) {
        onBoundaryReached()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return <React.Fragment>{children}</React.Fragment>
}

export default Scroll
