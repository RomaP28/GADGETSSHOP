import { useState, useEffect, Children, cloneElement } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import styles from './Carousel.module.scss'

const PAGE_WIDTH = 900;

function Carousel({ children }) {
  const [pages, setPages] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setPages(
      Children.map(children, child => {
        return cloneElement(child, {
          style: {
            height: '100%',
            maxWidth: `${PAGE_WIDTH}px`,
            minWidth: `${PAGE_WIDTH}px`
          }
        })
      })
    )
    return () => {
      setInterval(automatScroll, 7000)
    }
  }, [])

  function automatScroll() {
    setOffset(curOffset => {
      let newOffset = curOffset - PAGE_WIDTH;
      const maxOffset = -(PAGE_WIDTH * 4)
      return newOffset < maxOffset ? newOffset = 0 : newOffset
    })
  }

  function handleLeftArrowClick() {
    setOffset(curOffset => {
      const newOffset = curOffset + PAGE_WIDTH;
      newOffset > 0 && setOffset(-(PAGE_WIDTH * (pages.length - 1)))
      return Math.min(newOffset, 0)
    })
  }

  function handleRightArrowClick() {
    setOffset(curOffset => {
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
      const newOffset = curOffset - PAGE_WIDTH;
      newOffset < maxOffset && setOffset(0)
      return Math.max(newOffset, maxOffset)
    })
  }

  return (
    <div className={styles.main_container}>
      <FaAngleLeft className={styles.arrow_left} onClick={handleLeftArrowClick} />
      <div className={styles.window}>
        <div className={styles.all_pages_container} style={{ transform: `translateX(${offset}px)` }}>
          {pages}
        </div>
      </div>
      <FaAngleRight className={styles.arrow_right} onClick={handleRightArrowClick} />
    </div>
  )
}

export default Carousel;