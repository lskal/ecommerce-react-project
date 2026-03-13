import ProductListing from "../product-listing/product-listing";
import styles from "./home-main-componet.module.scss";

export default function HomeMainComponet() {
  return (
    <>
      <div className={styles.container}>
        <h1>WELCOME TO MY STORE</h1>
        <h6>Check out a random selection of our products:</h6>
        <ProductListing randomProducts numberRandomProducts={16} />
      </div>
    </>
  );
}
