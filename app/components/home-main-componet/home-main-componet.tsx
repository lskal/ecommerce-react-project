import { Icon } from "@iconify/react";
import styles from "./home-main-componet.module.scss";

export default function homeMainComponet() {
  return (
    <>
      <div className={styles.container}>
        <Icon color="tomato" height={50} icon="mdi-light:home" />
        <h1>WELCOME TO THE HOMEPAGE</h1>
      </div>
    </>
  );
}
