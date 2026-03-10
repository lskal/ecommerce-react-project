import { useProducts } from "../../hooks/useProducts";
import { useRandomProduct } from "../../hooks/useRandomProduct";

import ProductTile from "../product-tile/product-tile";
import ProductTileSkeleton from "../product-tile-skeleton/product-tile-skeleton";

import type { IProductListingProps } from "../../types/product";

import styles from "./product-listing.module.scss";

export default function ProductListing({
  limit = 20,
  skip,
  select,
  sortBy,
  order,
  category,
  search,
  randomProducts = false,
  numberRandomProducts = 8,
}: IProductListingProps) {
  const { products, loading, error } = useProducts({
    limit,
    skip,
    select,
    sortBy,
    order,
    category,
    search,
  });

  const randomProductList = useRandomProduct(products, numberRandomProducts);

  const displayedProducts = randomProducts ? randomProductList : products;
  const skeletonCount = randomProducts ? numberRandomProducts : limit;

  if (loading) {
    return (
      <div className={styles.plpWrapper}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductTileSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!displayedProducts.length) {
    return <p>No products found.</p>;
  }

  return (
    <div className={styles.plpWrapper}>
      {displayedProducts.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
}
