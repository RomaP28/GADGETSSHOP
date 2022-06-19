import React, { useContext } from "react";
import Card from "../../Components/Card";
import AppContext from "../../context";
import styles from "./Products.module.scss"

function AllProducts({ products, addToCart, addToFavorite, favorites, isLoading }) {
  const { searchValue, setSearchValue } = useContext(AppContext)
  // const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const renderingProducts = () => {
    const filteredItems = products.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (
      filteredItems.map((item, index) =>
        <Card
          card={item}
          addToCart={() => addToCart(item)}
          addToFavorite={() => {
            typeof favorites.find(e => +e.parentId === +item.id) === 'undefined' ?
              addToFavorite(item) :
              addToFavorite(favorites.find(e => +e.parentId === +item.id))
          }}
          favorited={favorites.some(e => +e.parentId === +item.id)}
          key={index}
          loading={isLoading}
        />)
    )
  }

  return (
    <main>
      <div className={styles.searchField}>
        <h1>{searchValue ? `${searchValue}` : 'Our Products'}</h1>
        <div className={styles.searchBlock}>
          <img className={styles.searchico} src="./img/search-icon.svg" alt="search" />
          <input className={styles.search} onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Search..." />
          {searchValue && <img className={styles.clear} onClick={() => setSearchValue('')} src="./img/xmark-solid.svg" alt="clear" />}
        </div>
      </div>
      <div className={styles.content}>
        {renderingProducts()}
      </div>
    </main>
  )
}

export default AllProducts;