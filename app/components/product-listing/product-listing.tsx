import { useProducts } from "../../hooks/useProducts";
import ProductTile from "../product-tile/product-tile";
import ProductTileSkeleton from "../product-tile-skeleton/product-tile-skeleton";
import styles from "./product-listing.module.scss";
import type { IProductsFetchParams } from "../../types/product";

export default function ProductListing({ limit = 194, category }: IProductsFetchParams) {
  const { products, loading, error } = useProducts({ limit, category });

  if (loading) {
    return (
      <div className={styles.plpWrapper}>
        {Array.from({ length: limit }).map((_, key) => (
          <ProductTileSkeleton key={key} />
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
