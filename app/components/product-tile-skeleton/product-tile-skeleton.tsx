import Skeleton from "react-loading-skeleton";
import styles from "../product-tile/product-tile.module.scss";

export default function ProductTileSkeleton() {
  return (
    <div className={styles.tile} aria-hidden="true">
      <Skeleton height={300} />
      <Skeleton count={1} style={{ marginTop: "0.75rem" }} />
      <Skeleton width="40%" />
    </div>
  );
}
