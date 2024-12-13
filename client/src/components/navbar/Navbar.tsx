import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import useAuth from "@hooks/auth/useAuth";
import { useRef, useState } from "react";
import useHandleClickOutsideNode from "@hooks/helpers/useHandleClickOutsideNode";

const Navbar = () => {
  const { userImg } = useAuth();
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleProfileToggle = () => {
    setProfileIsOpen(!profileIsOpen);
  };

  useHandleClickOutsideNode(dropdownRef, () => setProfileIsOpen(false));

  return (
    <div className={styles.container}>
      <nav className={styles.fullNavbar}>
        <div className={styles.navContainer}>
          <Link className={styles.title} to="/">
            Min Saga
          </Link>
          <ul className={styles.navLinks}>
            <li tabIndex={0}>
              <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/my-stories">
                Mina Berättelser
              </NavLink>
            </li>
            <li tabIndex={1}>
              <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/stories">
                Berättelser
              </NavLink>
            </li>
            <li tabIndex={2}>
              <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/help-and-support">
                Hjälp & kontakt
              </NavLink>
            </li>
          </ul>

          <button className={styles.userButton} onClick={handleProfileToggle}>
            <img className={styles.userImg} src={userImg} alt="user" />
          </button>
        </div>
      </nav>

      <div ref={dropdownRef} className={`${styles.profileActionContainer} ${profileIsOpen ? styles.open : ""}`}>
        <ul>
          <li>Profil</li>
          <li>Logga ut</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
