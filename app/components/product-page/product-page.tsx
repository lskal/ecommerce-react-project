import useEcommerceStore from "../../store/ecommerce.store";
import usePrice from "../../hooks/usePrice";

import type { IProduct } from "../../types/product";

import styles from "./product-page.module.scss";

export default function ProductPage({ product }: { product: IProduct }) {
  const addCartProduct = useEcommerceStore((state) => state.addCartProduct);

  const handleAddToCart = () => {
    addCartProduct(product);
  };

  const categoryUppercase = product.category.toUpperCase();

  return (
    <div className={styles.containerProduct}>
      <div className={styles.left}>
        <img src={product.images?.[0]} alt={product.title} />
      </div>
      <div className={styles.right}>
        <h1>{product.title}</h1>
        <h6>{categoryUppercase}</h6>
        <h5>{usePrice(product.price)}</h5>
        <p>{product.description}</p>
        <button onClick={handleAddToCart} className={styles.buttonAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
