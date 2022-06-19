import React, { useContext } from 'react';
import MainSlider from '../../Components/Sider';
import SliderProducts from '../../Components/SliderProducts'
import AppContext from '../../context';
// import { Navigate } from 'react-router-dom'

import styles from "./Main.module.scss";


function Main({ products, addToCart, addToFavorite, favorites, isLoading }) {
  const { setSearchValue, searchValue } = useContext(AppContext)

  // const onChangeSearchInput = (event) => {
  //   setSearchValue(event.target.value)
  // }

  return (
    <>
      <main>
        <MainSlider />
        <div className={styles.searchField}>
          <h1>{searchValue ? `${searchValue}` : 'Latest'}</h1>
          {/* <div className={styles.searchBlock}>
            <img className={styles.searchico} src="./img/search-icon.svg" alt="search" />
            <input className={styles.search} onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Search..." />
            {searchValue && <img className={styles.clear} onClick={() => setSearchValue('')} src="./img/xmark-solid.svg" alt="clear" />}
          </div> */}
        </div>
        <SliderProducts
          products={products}
          addToCart={addToCart}
          addToFavorite={addToFavorite}
          favorites={favorites}
          isLoading={isLoading}
        />
      </main>
    </>
  )
}

export default Main;