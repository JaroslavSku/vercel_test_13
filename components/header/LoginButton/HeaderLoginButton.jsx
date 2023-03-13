/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileImage from "../../profileimage/ProfileImage";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import styles from "./LoginButton.module.scss";

export default function LoginButton() {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const { imageUrl } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  let userName;
  if (typeof window !== "undefined") {
    userName = JSON.parse(localStorage.getItem("rdUser"))?.userName;
  }
  function onShowMenu() {
    setShowMenu(!showMenu);
  }
  return (
    <div className={styles.body}>
      {isAuth ? (
        <div onClick={onShowMenu}>
          <div
            style={{ zIndex: showMenu ? "101" : "0" }}
            className={styles.loggedInUserBody}
          >
            <ProfileImage
              url={imageUrl}
              timeStamp={Date.now()}
              imgCss={styles.userImage}
            />
            <span className={styles.userName}>{userName}</span>
            <span className={styles.horizontalLine}></span>
            <img
              className={showMenu ? styles.arrowUp : styles.arrowDown}
              src={`${iconsUrl}/general/right-arrow.svg`}
              alt="right arrow image"
            />
          </div>
          <div
            style={{ display: showMenu ? "block" : "none" }}
            className={styles.overlay}
          ></div>
          <ProfileMenu show={showMenu} />
        </div>
      ) : (
        <div className={styles.loginButton}>
          <Link href="/prihlaseni">Přihlásit se</Link>
        </div>
      )}
    </div>
  );
}
