import React from "react";
import Carousel from './Carousel'

import styles from './Slider.module.scss'

function MainSlider() {
  return (
    <Carousel>
      <div className={styles.item1}></div>
      <div className={styles.item2}></div>
      <div className={styles.item3}></div>
      <div className={styles.item4}></div>
      <div className={styles.item5}></div>
    </Carousel>
  )
}

export default MainSlider;