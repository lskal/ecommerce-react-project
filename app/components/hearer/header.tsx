import { Link } from "react-router";
// import { Icon } from "@iconify/react";

import styles from "./header.module.scss";

export default function header() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.logo}>
          <Link to="/">
            <img src={`${baseUrl}logo.svg`} alt="Logo" width={50} />
          </Link>
        </h1>
      </div>
      <div className={styles.right}>
        <Link to="/products/16">Apple</Link>
        <Link to="/products">All products</Link>
        <Link to="/category">Smartphones</Link>
      </div>
    </div>
  );
}
