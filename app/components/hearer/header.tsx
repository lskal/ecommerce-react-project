import { Link } from "react-router";
// import { Icon } from "@iconify/react";
import Logo from "../../../public/logo.svg";

import styles from "./header.module.scss";

export default function header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.logo}>
          <Link to="/">
            {/* <Icon color="black" height={50} icon="mdi-light:home" /> */}
            <img src={Logo} alt="logo" width={50} />
          </Link>
        </h1>
      </div>
      <div className={styles.right}>
        <Link to="/products">Products</Link>
        <Link to="/products/2222">Product 222</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}
