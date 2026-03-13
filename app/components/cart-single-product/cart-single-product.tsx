import usePrice from "../../hooks/usePrice";
import useEcommerceStore from "../../store/ecommerce.store";

import type { ICartSingleProductProps } from "../../types/product";

import styles from "./cart-single-product.module.scss";

export default function CartSingleProduct({ product }: ICartSingleProductProps) {
  const increaseCartProduct = useEcommerceStore((state) => state.increaseCartProduct);
  const decreaseCartProduct = useEcommerceStore((state) => state.decreaseCartProduct);
  const deleteCartProduct = useEcommerceStore((state) => state.deleteCartProduct);

  return (
    <div className={styles.wrapperCartProduct}>
      <div className={styles.left}>
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className={styles.right}>
        <h4>{product.title}</h4>

        <div className={styles.quantityBlock}>
          <p>Quantity: {product.quantity}</p>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.controls}>
            <button onClick={() => decreaseCartProduct(product.id)}>-</button>
            <span>{product.quantity}</span>
            <button onClick={() => increaseCartProduct(product.id)}>+</button>
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.unitPrice}>Unit price: {usePrice(product.price)}</p>
            <p className={styles.totalPrice}>Total: {usePrice(product.price * product.quantity)}</p>
          </div>
        </div>

        <button className={styles.remove} onClick={() => deleteCartProduct(product.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}
