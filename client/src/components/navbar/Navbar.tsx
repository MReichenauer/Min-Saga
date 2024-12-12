import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.fullNavbar}>
      <div className={styles.navContainer}>
        <Link className={styles.title} to="/">
          Min Saga
        </Link>
        <ul>
          <li>
            <NavLink to="/my-stories">Mina Berättelser</NavLink>
          </li>
          <li>
            <NavLink to="/stories">Berättelser</NavLink>
          </li>
          <li>
            <NavLink to="/help-and-support">Hjälp & kontakt</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
