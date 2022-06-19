import styles from './Header.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'

function Header({ setIsCartOpened, cartItems, amountFav }) {
  const totalPrice = cartItems.reduce((acc, cur) => cur.price + acc, 0)

  return (
    <header>
      <div className={styles.header_container}>
        <div className={styles.header_title}>
          <Link to="/"><h1>GadgetsShop</h1></Link>
        </div>
        <div className={styles.header_navigation}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>
        <div className={styles.header_icons}>
          <div className={styles.cart_img} onClick={() => { setIsCartOpened(true) }}>
            <img src="./img/shopping.svg" alt="shopping" />
            <p className={styles.amount}>{cartItems.length}</p>
            <span>{totalPrice}$</span>
          </div>
          <div className={styles.heart_img} >
            <Link to="favorites"><img src={amountFav ? "./img/heart-solid.svg" : "./img/favorites.svg"} alt="favorites" /></Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;