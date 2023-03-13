/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import LoginButton from "./LoginButton/HeaderLoginButton";
import BurgerMenu from "../burgermenu/BurgerMenu";
// import { baseUrlIcons } from "../../utils/constants";
import { Style_Script } from "@next/font/google";
import { useRouter } from "next/router";
const inter = Style_Script({ weight: "400", subsets: ["latin"] });
function Header() {
  const router = useRouter();

  function handleRedirectToFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    router.push({
      pathname: "/oblibene",
      query: { fav: JSON.stringify(favorites) },
    });
  }

  return (
    <div className={styles.header}>
      <BurgerMenu />
      <div className={styles.logo}>
        {/* <img
          src={`${peopleIconsUrl}/logo.svg`}
          className={styles.logoImage}
          alt="logo"
        /> */}
        <Link style={inter.style} href="/">
          Nejlepší Spolubydlení
        </Link>
      </div>
      <nav className={styles.navBar}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/inzerat/obecne-informace">Přidat inzerát</Link>
          </li>
          <li className={styles.listItem}>
            <span onClick={handleRedirectToFavorites} href="/oblibene">
              Oblíbené
            </span>
          </li>
        </ul>
      </nav>
      <LoginButton />
    </div>
  );
}

export default Header;
