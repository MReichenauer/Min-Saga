import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import useAuth from "@hooks/auth/useAuth";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { userImg } = useAuth();
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleProfileToggle = () => {
    setProfileIsOpen(!profileIsOpen);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.fullNavbar}>
        <div className={styles.navContainer}>
          <Link className={styles.title} to="/">
            Min Saga
          </Link>
          <ul className={styles.navLinks}>
            <li tabIndex={0}>
              <NavLink to="/my-stories">Mina Berättelser</NavLink>
            </li>
            <li tabIndex={1}>
              <NavLink to="/stories">Berättelser</NavLink>
            </li>
            <li tabIndex={2}>
              <NavLink to="/help-and-support">Hjälp & kontakt</NavLink>
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
