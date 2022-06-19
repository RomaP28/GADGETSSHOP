import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Main from './Pages/Main'
import Cart from './Cart';
import AllProducts from './Pages/Products';
import Favorites from './Pages/Favorites';
import About from './Pages/About';
import AppContext from './context'
import Orders from './Pages/Orders';
import { AlertMessage } from './Components/AlertMessage';

function App() {

  const [open, setAlertOpen] = React.useState([false, '', '']);
  const [cartItems, setcartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [products, setProducts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isCartOPened, setIsCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    try {
      async function fetchData() {
        const itemsMain = await axios.get('https://6270eea36a36d4d62c1f15c9.mockapi.io/items');
        const itemsCart = await axios.get('https://6270eea36a36d4d62c1f15c9.mockapi.io/cart');
        const itemsFav = await axios.get('https://6270eea36a36d4d62c1f15c9.mockapi.io/favorites');

        setIsLoading(false)

        setcartItems(itemsCart.data)
        setFavorites(itemsFav.data)
        setProducts(itemsMain.data)
      }
      fetchData();
    } catch (error) {
      setAlertOpen([true, 'Error loading products. Please reload the page', 'error'])
    }
  }, [setAlertOpen])

  const onAddToCart = async elem => {
    try {
      const { data } = await axios.post('https://6270eea36a36d4d62c1f15c9.mockapi.io/cart', elem);
      setcartItems(prev => [...prev, data])
    } catch (error) {
      setAlertOpen([true, `Couldn't add to cart. Please try again`, 'error'])
    }
  }

  const onRemoveFromCart = id => {
    try {
      setcartItems(prev => prev.filter(e => e.id !== id))
      axios.delete(`https://6270eea36a36d4d62c1f15c9.mockapi.io/cart/${id}`);
    } catch (error) {
      setAlertOpen([true, `Can't remove item from the cart, please try again.`, 'error'])
    }

  }

  const onAddToFavorite = async elem => {
    if (typeof elem['parentId'] !== 'undefined') {
      try {
        axios.delete(`https://6270eea36a36d4d62c1f15c9.mockapi.io/favorites/${elem.id}`);
        setFavorites(prev => prev.filter(e => e.parentId !== elem.parentId))
      } catch (error) {
        setAlertOpen([true, `Can't remove item from the favorites, please try again.`, 'error'])
      }
    } else {
      try {
        elem.parentId = +elem.id
        const { data } = await axios.post('https://6270eea36a36d4d62c1f15c9.mockapi.io/favorites', elem);
        setFavorites(prev => [...prev, data])
      } catch (error) {
        setAlertOpen([true, `Can't add item to the favorites, please try again.`, 'error'])
      }
    }

  }

  return (
    <AppContext.Provider value={{
      setAlertOpen,
      cartItems,
      favorites,
      products,
      setIsCartOpened,
      setcartItems,
      onRemoveFromCart,
      onAddToCart,
      searchValue,
      setSearchValue
    }}>
      <div className="wrapper">
        <Cart
          isCartOPened={isCartOPened}
          items={cartItems}
          onRemoveFromCart={onRemoveFromCart}
        />
        <Header
          setIsCartOpened={setIsCartOpened}
          cartItems={cartItems}
          amountFav={favorites.length}
        />
        <Routes>
          <Route element={<Main
            products={products}
            addToCart={elem => onAddToCart(elem)}
            isLoading={isLoading}
            favorites={favorites}
            addToFavorite={elem => onAddToFavorite(elem)}
          />} path="/">
          </Route>
          <Route element={<Favorites
            items={favorites}
            addToCart={elem => onAddToCart(elem)}
            addToFavorite={onAddToFavorite}
          />} path="/favorites">
          </Route>
          <Route element={<AllProducts
            products={products}
            addToCart={elem => onAddToCart(elem)}
            isLoading={isLoading}
            favorites={favorites}
            addToFavorite={elem => onAddToFavorite(elem)}
          />} path="/products"></Route>
          <Route element={<About />} path="/about"></Route>
          <Route element={<Orders />} path="/orders"></Route>
        </Routes>
        <AlertMessage open={open} />
      </div >
    </AppContext.Provider>
  );
}

export default App;
