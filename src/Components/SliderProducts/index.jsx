import React from 'react'
import CarouselProducts from './CarouselProducts'
import Card from '../Card'

function SliderProducts({ products, addToCart, addToFavorite, favorites, isLoading }) {
  const latest = []
  for (let i = 0; i < 10; i++) {
    latest[i] = products[i];
  }

  const renderingProducts = () => {
    return (
      latest.map((item, index) =>
        <Card
          card={item}
          addToCart={() => addToCart(item)}
          addToFavorite={() => {
            typeof favorites.find(e => +e.parentId === +item.id) === 'undefined' ?
              addToFavorite(item) :
              addToFavorite(favorites.find(e => +e.parentId === +item.id))
          }}
          favorited={favorites.some(e => +e.parentId === +item.id)}
          loading={isLoading}
          key={index}
        />

      )
    )
  }
  return (
    <CarouselProducts>
      {renderingProducts()}
    </CarouselProducts>
  )
}

export default SliderProducts
