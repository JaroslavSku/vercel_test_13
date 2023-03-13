import { Popup } from "leaflet";
import { useRouter } from "next/router";
import React from "react";
import styles from "./Pop.module.scss";

export default function Pop({ marker }) {
  const router = useRouter();
  function handleClick() {
    router.push(
      `/inzerat/${marker?.address?.replaceAll("_", " ") || ""}/${marker._id}`
    );
  }
  const description = `Pronájem ${marker?.layout || ""} za ${
    marker?.rent?.toLocaleString() || ""
  } Kč`;
  return (
    <span className={styles.popup} onClick={() => handleClick()}>
      {description}
    </span>
  );
}
