import usePrice from "../../hooks/usePrice";
import useEcommerceStore from "../../store/ecommerce.store";
import CartSingleProduct from "../cart-single-product/cart-single-product";

import styles from "./cart-products.module.scss";

export default function CartProducts() {
  const currentCart = useEcommerceStore((state) => state.cartProducts);

  return (
    <div className={styles.wrapperCart}>
      <div className={styles.cartHeader}>
        <div className={styles.left}>
          <h1>Cart</h1>
          <h3>PRODUCTS:</h3>
        </div>
        <div className={styles.right}>
          <h3>TOTAL:</h3>
          <h3>
            {usePrice(
              currentCart.reduce((acc, product) => acc + product.price * product.quantity, 0),
            )}
          </h3>
        </div>
      </div>

      {currentCart.length ? (
        <div className={styles.productsList}>
          {currentCart.map((product) => (
            <CartSingleProduct key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyCart}>Cart is empty</p>
      )}
    </div>
  );
}
