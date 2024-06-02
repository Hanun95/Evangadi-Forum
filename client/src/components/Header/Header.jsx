import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <img src="evangadi-logo-black.png" alt="evangadi logo" />
        </Link>
        <div className={styles.menus}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">How It Works</Link>
            </li>
            <li className={styles.button}>SIGN IN</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
