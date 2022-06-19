import styles from './OrderItem.module.scss'
import ContentLoader from 'react-content-loader'

export const OrderItem = ({ order, loading = false }) => {
  return (
    <>
      {loading ?
        <ContentLoader
          speed={2}
          width={300}
          height={80}
          viewBox="0 0 300 80"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="3" y="83" rx="0" ry="0" width="80" height="48" />
          <rect x="0" y="138" rx="0" ry="0" width="147" height="23" />
          <rect x="-2" y="173" rx="0" ry="0" width="156" height="23" />
          <rect x="66" y="181" rx="0" ry="0" width="14" height="2" />
          <rect x="28" y="81" rx="0" ry="0" width="80" height="51" />
          <rect x="-1" y="2" rx="0" ry="0" width="82" height="75" />
          <rect x="99" y="10" rx="0" ry="0" width="134" height="22" />
          <rect x="99" y="50" rx="0" ry="0" width="131" height="20" />
        </ContentLoader> :
        <div className={styles.order}>
          <img src={order.img} alt={order.title} />
          <div className={styles.orderItemDescription}>
            <p>{order.title}</p>
            <b>{order.price}$</b>
          </div>
        </div>}
    </>
  )
}