import { Link, NavLink } from "react-router-dom";
import styles from "./bigNav.module.css";
import useAuth from "@hooks/auth/useAuth";
import { useRef, useState } from "react";
import { useHandleClickOutsideNode } from "@hooks/helpers/useHandleClickOutsideNode";
import useHandleEscapeKey from "@hooks/helpers/useHandleEscapeKey";

const BigNav = () => {
  const { userImg, logout } = useAuth();
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { handleMouseDown, handleMouseUp } = useHandleClickOutsideNode(dropdownRef, () => setProfileIsOpen(false));
  useHandleEscapeKey(() => setProfileIsOpen(false), profileIsOpen);

  const handleProfileToggle = () => {
    setProfileIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.fullNavbar}>
        <div className={styles.navContainer}>
          <header className={styles.navHeader}>
            {" "}
            <Link className={styles.title} to="/">
              Min Saga
            </Link>
          </header>
          <ul className={styles.navLinks}>
            <li>
              <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/my-stories">
                Mina sagor
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/create-story">
                Skapa en saga
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/help-and-support">
                Hjälp & kontakt
              </NavLink>
            </li>
          </ul>

          <button
            aria-label="profile actions menu"
            className={styles.userButton}
            onClick={handleProfileToggle}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            tabIndex={0}
          >
            <img className={styles.userImg} src={userImg} alt="user" />
          </button>
        </div>
      </nav>

      <div
        ref={dropdownRef}
        className={`${styles.profileActionContainer} ${profileIsOpen ? styles.open : ""}`}
        aria-hidden={!profileIsOpen}
      >
        <ul>
          <li tabIndex={0} aria-label="logout" onClick={logout}>
            Logga ut
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BigNav;
