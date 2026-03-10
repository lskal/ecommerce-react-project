import { Link } from "react-router";
import usePrice from "../../hooks/usePrice";
import type { IProduct } from "../../types/product";

import styles from "./product-tile.module.css";

export default function productTile({ product }: { product: IProduct }) {
  return (
    <Link to={`/products/${product.id}`} className={styles.tile}>
      <img src={product.images[0]} alt={product.title} />
      <p>{product.title}</p>
      <p>{usePrice(product.price)}</p>
    </Link>
  );
}
