import { Link } from "react-router";
import styles from "./not-found.module.scss";

export default function NotFound({ message }: { message?: string }) {
  return (
    <main className={styles.wrapper404}>
      <h1 className={styles.title404}>404</h1>
      <p className={styles.text404}>{message ?? "The page you are looking for does not exist."}</p>

      <Link className={styles.button404} to="/">
        Go home
      </Link>
    </main>
  );
}
