/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, useEffect } from "react";
import { includes } from "lodash";
import styles from "./Hearts.module.scss";
import { connect, useSelector } from "react-redux";
import {
  addHeartUnregistered,
  deleteHeartUnregistered,
  autoLoginFavorites,
} from "../../redux/actions/userActions";
import { iconsUrl } from "@/utils/urls";

const Hearts = (
  { id, addHeartUnregistered, deleteHeartUnregistered, editable = true },
  ref
) => {
  const likesAds = useSelector((state) => state.auth.likesAds);

  function heartAdd() {
    if (!includes(likesAds, id)) {
      addHeartUnregistered(id);
    }
  }

  function heartDelete() {
    if (editable) {
      if (includes(likesAds, id)) {
        deleteHeartUnregistered(id);
      }
    }
  }

  if (includes(likesAds, id)) {
    return (
      <img
        alt="heart"
        className={styles.heart}
        onClick={heartDelete}
        src={`${iconsUrl}/heart.svg`}
        ref={ref}
      />
    );
  }
  return (
    <img
      alt="heart-outline"
      className={styles.heart}
      onClick={heartAdd}
      src={`${iconsUrl}/heart-outline.svg`}
    />
  );
};

export default connect((state) => state, {
  addHeartUnregistered,
  deleteHeartUnregistered,
  autoLoginFavorites,
})(forwardRef(Hearts));
