import React from "react";
import AppContext from "../../context";
import Card from "../../Components/Card";
import styles from "../Main/Main.module.scss";

function Favorites({ addToCart, addToFavorite }) {
  const { favorites } = React.useContext(AppContext)

  return (
    <main>
      <h2>Favorites</h2>
      <p>My favorites</p>
      <div className={styles.content}>
        {favorites.map((item, index) => <Card
          card={item}
          addToCart={() => addToCart(item)}
          addToFavorite={() => addToFavorite(item)}
          key={index}
          favorited={true}
        />)}
      </div>
    </main>
  )
}

export default Favorites;