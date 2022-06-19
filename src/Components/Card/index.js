import React from 'react';
import CardOptions from '../CardOptions';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"

function Card({ card, addToCart, addToFavorite, favorited, loading = false }) {
  const [isCardHover, setIsCardHover] = React.useState(false);
  const [favorites, setFavorited] = React.useState(false);

  const changeFavorite = (e) => {
    addToFavorite(e)
    setFavorited(!favorites)
  }

  return (

    <div className={styles.card} onMouseOver={() => setIsCardHover(true)} onMouseOut={() => setIsCardHover(false)}>

      {loading ?
        <ContentLoader
          speed={2}
          width={150}
          height={200}
          viewBox="0 0 150 208"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="148" height="123" />
          <rect x="0" y="136" rx="0" ry="0" width="147" height="23" />
          <rect x="-2" y="173" rx="0" ry="0" width="156" height="23" />
          <rect x="66" y="181" rx="0" ry="0" width="14" height="2" />
        </ContentLoader> :
        <>
          <img src={card.img} alt={card.title} />
          {isCardHover && addToCart && <CardOptions
            addToCart={addToCart}
            changeFavorite={changeFavorite}
            favorited={favorited}
          />}
          <p>{card.title}</p>
          <b>{card.price}$</b>
        </>
      }
    </div>
  )
}

export default Card;