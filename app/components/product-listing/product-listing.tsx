import { useProducts } from "../../hooks/useProducts";
import ProductTile from "../product-tile/product-tile";
import ProductTileSkeleton from "../product-tile-skeleton/product-tile-skeleton";
import styles from "./product-listing.module.scss";

export default function ProductListing({ limitFetch }: { limitFetch: number }) {
  const { products, loading, error } = useProducts({ limit: limitFetch });

  if (loading) {
    return (
      <div className={styles.plpWrapper}>
        {Array.from({ length: limitFetch }).map((_, i) => (
          <ProductTileSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.plpWrapper}>
      {products.map((product) => (
        <ProductTile product={product} key={product.id} />
      ))}
    </div>
  );
}
