import usePrice from "../../hooks/usePrice";
import type { IProduct } from "../../types/product";
import styles from "./product-page.module.scss";

export default function productPage({ product }: { product: IProduct }) {
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
      </div>
    </div>
  );
}
