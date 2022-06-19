import React from "react";
import axios from "axios";
import { OrderItem } from "../../Components/OrderItem";
import styles from "./Orders.module.scss";
import AppContext from "../../context";

function Orders() {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { setAlertOpen } = React.useContext(AppContext);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const { data } = await axios.get('https://6270eea36a36d4d62c1f15c9.mockapi.io/orders');
        const arr = data.reverse().map(obj => obj) // data.map(obj => obj.items).flat()
        setOrders(arr)
      } catch (error) {
        setAlertOpen([true, `Something went wrong, please try again.`, 'error'])
      }
      setIsLoading(false)
    }
    fetchData();
  }, [setAlertOpen])

  return (
    <main>
      <h2>ORDERS</h2>
      <p>History orders</p>
      <div className={styles.orders_content}>
        {orders.map((item, index) =>
          <div className={styles.order} key={index}>
            <div className={styles.order_header}>
              <p><span>{item.createdAt}</span> <b className={styles.order_title}>Order #{item.id}</b></p>
              {/* <p>{item.createdAt}</p> */}
              <p>Total <b>{item.total}$</b></p>
            </div>
            <div className={styles.order_items}>
              {item.items.map((el, index) =>
                <OrderItem
                  order={el}
                  loading={isLoading}
                  key={index}
                />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Orders;