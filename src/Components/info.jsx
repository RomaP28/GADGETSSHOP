import React from "react";
import styles from "../Cart/Cart.module.scss"

const Info = ({ image, title, description, closingCart }) => {
  return (
    <div className={styles.cartIsEmpty}>
      <img src={image} alt="icon" />
      <div>
        <b>{title}</b>
        <p className={styles.tips}>{description}</p>
        <button onClick={() => closingCart()}>Back to store</button>
      </div>
    </div>
  )
}

export default Info;