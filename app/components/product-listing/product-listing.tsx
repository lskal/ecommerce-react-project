import { useProducts } from "../../hooks/useProducts";
import ProductTile from "../product-tile/product-tile";
import styles from "./product-listing.module.scss";

export default function productListing() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className={styles.plpWrapper}>
        {products.map((product) => (
          <ProductTile product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
