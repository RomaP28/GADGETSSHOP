import styles from './CardOptions.module.scss'
import React from 'react';

function CardOptions({ addToCart, changeFavorite, favorited }) {
  const [count, setCount] = React.useState(false);
  const onCLickCart = () => {
    addToCart()
    setCount(true)
    let timerID = setTimeout(() => {
      setCount(false)
      clearTimeout(timerID);
    }, 200)
  }

  return (
    <div className={styles.cardOptions}>
      <div onClick={() => onCLickCart()} className={styles.icons} style={count ? { backgroundImage: `url(./img/cart-arrow-down-solid.svg)` } : { backgroundImage: `url(./img/cart-shopping-solid.svg)` }} >
      </div>
      <div onClick={() => changeFavorite()} className={styles.icons} style={favorited ? { backgroundImage: `url(./img/heart-solid.svg)` } : { backgroundImage: `url(./img/heart-regular.svg)` }} >
      </div>
    </div >
  )
}

export default CardOptions;