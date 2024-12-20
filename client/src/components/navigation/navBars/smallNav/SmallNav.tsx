import { useRef, useState } from "react";
import styles from "./smallNav.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Svg from "@components/svg/svg";
import { IconEnum } from "@components/svg/Models";
import useAuth from "@hooks/auth/useAuth";
import { useHandleClickOutsideNode } from "@hooks/helpers/useHandleClickOutsideNode";

const SmallNav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { userImg, user, logout } = useAuth();
  const { handleMouseDown, handleMouseUp } = useHandleClickOutsideNode(navRef, () => setNavIsOpen(false));

  const handleToggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };

  const handleProfile = () => {
    navigate("/profile");
    setNavIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setNavIsOpen(false);
  };

  return (
    <nav className={styles.fullNav} ref={navRef}>
      <header className={styles.header}>
        <Link to={"/"} className={styles.title} onClick={() => setNavIsOpen(false)}>
          Min Saga
        </Link>
      </header>

      <button
        className={styles.toggleNavButton}
        onClick={handleToggleNav}
        aria-label="Toggle navigation"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Svg icon={navIsOpen ? IconEnum.CLOSE : IconEnum.BURGERMENU} size={20} />
      </button>

      <div className={`${styles.navContent} ${navIsOpen ? styles.open : ""}`}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink to={"/my-stories"} onClick={() => setNavIsOpen(false)}>
              Mina berättelser
            </NavLink>
          </li>
          <li>
            <NavLink to={"/create-story"} onClick={() => setNavIsOpen(false)}>
              Skapa en berättelse
            </NavLink>
          </li>
          <li>
            <NavLink to={"/help-and-support"} onClick={() => setNavIsOpen(false)}>
              Hjälp & kontakt
            </NavLink>
          </li>
        </ul>
        <div className={styles.profile}>
          <button
            aria-label="Logout"
            className={styles.logoutButton}
            onClick={handleLogout}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            Logga ut
          </button>
          <button
            aria-label="Profile"
            onClick={handleProfile}
            className={styles.profileButton}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <img src={userImg} alt={`image of ${user?.displayName}`} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SmallNav;
