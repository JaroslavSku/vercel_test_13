/* eslint-disable @next/next/no-img-element */
import React from "react";
import { connect, useSelector } from "react-redux";
import {
  updateFacebookVerification,
  updateGoogleVerification,
} from "../../../redux/actions/userActions";
import { baseUrlIcons } from "../../../utils/constants";
import styles from "./SocialNetworks.module.scss";

function SocialNetworks({
  updateFacebookVerification,
  updateGoogleVerification,
}) {
  const facebook = useSelector((state) => state.auth.facebook);
  const google = useSelector((state) => state.auth.google);
  function responseFacebook(response) {
    console.log(response);
    updateFacebookVerification(response);
  }

  function responseGoogle(response) {
    console.log(response);
    updateGoogleVerification(response);
  }

  return (
    <div className={styles.socialNetworks}>
      <div className={styles.socialNetworksTitle}>
        Propojte si účet se sociálními sítěmi
      </div>
      <div className={styles.socialNetworksBody}>
        <div className={styles.google}></div>
      </div>
    </div>
  );
}

export default connect((state) => state, {
  updateGoogleVerification,
  updateFacebookVerification,
})(SocialNetworks);
