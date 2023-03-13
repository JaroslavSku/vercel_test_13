/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { autoLogin, autoLoginFavorites } from "../../redux/actions/userActions";
// import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./Layout.module.scss";

function Layout(props) {
  const { children } = props;
  const isAuth = useSelector((state) => state.auth.token !== null);
  const router = useRouter();
  useEffect(() => {
    props.autoLoginFavorites();
    if (localStorage.getItem("rdUser")) {
      const { token = null } = JSON.parse(localStorage.getItem("rdUser"));
      if (token) {
        props.autoLogin();
      } else {
        router.push("/logout");
        return;
      }
    } else {
      const currentPath = window.location.pathname;
      if (currentPath?.includes("interni")) {
        router.push("/logout");
      }
      console.log("logged out");
    }
  }, [isAuth]);
  return (
    <>
      <Header />
      <div className={styles.pageContainer}>{children}</div>
    </>
  );
}

export default connect((state) => state, { autoLogin, autoLoginFavorites })(
  Layout
);
//export default Layout;
