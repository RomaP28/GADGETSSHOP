import styles from './Cart.module.scss'
import Info from '../Components/info';
import React from 'react';
import AppContext from '../context';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

function Cart({ isCartOPened, onRemoveFromCart, items = [] }) {
  const totalPrice = items.reduce((acc, cur) => cur.price + acc, 0)
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setAlertOpen, cartItems, setcartItems, setIsCartOpened } = React.useContext(AppContext)

  const onClickOrder = async totalPr => {
    setIsLoading(true)
    const time = new Date().toLocaleString('default', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit' });
    try {
      const itemsCart = await axios.get('https://6270eea36a36d4d62c1f15c9.mockapi.io/cart');
      for (let i = 0; i < itemsCart.data.length; i++) {
        await axios.delete(`https://6270eea36a36d4d62c1f15c9.mockapi.io/cart/${itemsCart.data[i].id}`)
      }
      const { data } = await axios.post('https://6270eea36a36d4d62c1f15c9.mockapi.io/orders', {
        items: cartItems,
        total: totalPr,
        createdAt: time
      })
      setOrderId(data.id)
      setIsOrderCompleted(true)
      setcartItems([])
      setAlertOpen([true, 'You have successfully placed your order!', 'success'])
    } catch (error) {
      setAlertOpen([true, `Something went wrong, please try again.`, 'error'])
    }
    setIsLoading(false)
  }

  const closingCart = () => {
    setIsCartOpened(false)
    !isLoading && setTimeout(() => setIsOrderCompleted(false), 500)
  }

  return (
    <div className={`${styles.overlay} ${isCartOPened ? styles.overlayVisible : ''}`}
      onClick={() => closingCart()}>
      <div className={styles.drawer} onClick={e => e.stopPropagation()}>
        <div className={styles.title}>
          <h2 className={styles.closeCart} onClick={() => closingCart()}>&gt;</h2>
          <h2>Cart</h2>
        </div>
        {items.length > 0 ?
          <>
            <div className={styles.itemList}>
              {items.map((obj, index) => (
                <div className={styles.itemPosition} key={index}>
                  <img src={obj.img} alt={obj.title} />
                  <div className={styles.itemInfo}>
                    <p>{obj.title}</p>
                    <b>{obj.price}$</b>
                  </div>
                  <div className={styles.deleteItem} onClick={isLoading ? null : () => onRemoveFromCart(obj.id)}></div>
                </div>
              ))}
            </div>
            <div className={styles.bottomBlock}>
              <div className={styles.priceLabel}>
                <p>Price</p>
                <b>{totalPrice} USD</b>
              </div>
              <button disabled={isLoading} onClick={() => onClickOrder(totalPrice)}>
                {isLoading ?
                  <>
                    <p>Placing your order...</p>
                    <div className={styles.clipLoader}><ClipLoader color={'#fff'} size={15} /></div>
                  </>
                  :
                  <>
                    <p>Buy it now</p>
                    <div className={styles.iconOrder}></div>
                  </>}
              </button>
            </div>
          </>
          :
          <>
            <Info
              image={isOrderCompleted ? './img/thumbs-up-regular.svg' : './img/box-open-solid.svg'}
              title={isOrderCompleted ? `Your order #${orderId} was placed successfully!` : 'Your cart is empty'}
              description={isOrderCompleted ?
                'Our manager will contact you shortly, in the meantime you can continue shopping' :
                'To place an order, add at least one item, please'}
              closingCart={closingCart}
            />
            <div className={styles.bottomBlock}>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Cart;