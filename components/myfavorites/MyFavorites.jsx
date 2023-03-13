import Link from "next/link";
import React, { useState } from "react";
import styles from "./MyFavorites.module.scss";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { deleteAllHearts } from "@/redux/actions/userActions";
import LoginModal from "../modals/loginmodal/LoginModal";

function MyFavorites({ deleteAllHearts, onSave }) {
  const likesAds = useSelector((state) => state.auth.likesAds);

  const router = useRouter();
  function handleRedirectToFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    router.push({
      pathname: "/oblibene",
      query: { fav: JSON.stringify(favorites) },
    });
  }

  function handleDelete() {
    deleteAllHearts();
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Moje oblíbené</h3>
      <div className={styles.body}>
        <div onClick={handleRedirectToFavorites} className={styles.favorites}>
          <div className={styles.favoritesTitle}>Zobrazit oblíbené</div>
          <div className={styles.bubbleContainer}>
            <div className={styles.bubble}>{likesAds?.length}</div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleDelete} className={styles.buttonDelete}>
            Smazat
          </button>
          <button onClick={onSave} className={styles.buttonSave}>
            Uložit
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => state, { deleteAllHearts })(MyFavorites);
