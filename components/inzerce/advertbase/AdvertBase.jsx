/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./AdvertBase.module.scss";
import { first } from "lodash";
// import { LocationOn } from "@material-ui/icons";
import $c from "../../../utils/currencyFormatter";
import { iconsUrl } from "@/utils/urls";
import Image from "next/image";

export default function AdvertBase({ handleEdit, advert }) {
  function handleError(e) {
    e.target.src = `${iconsUrl}/upload-empty.png`;
  }
  console.log(
    "picture src",
    `${process.env.NEXT_PUBLIC_REACT_BE_API}/${first(advert?.images)?.src}`
  );
  const src = `${process.env.NEXT_PUBLIC_REACT_BE_API}/${
    first(advert?.images)?.src
  }`;
  function handleClick() {
    if (handleEdit) {
      handleEdit(advert._id);
    }
  }
  return (
    <div
      onClick={() => handleClick}
      style={{ cursor: handleEdit ? "pointer" : "auto" }}
      className={styles.body}
    >
      {first(advert?.images)?.src && (
        <Image
          loader={() => src}
          loading="lazy"
          className={styles.image}
          onError={handleError}
          layout="fill"
          src={src}
          alt="image product"
        />
      )}
      <h4 className={styles.title}>
        {`Pronájem ${advert?.layout || ""}, ${advert?.size || ""}`}m<sup>2</sup>
        , {$c(advert?.rent) || ""}
      </h4>
      <p className={styles.bottomLine}>
        {/* <LocationOn /> */}
        {advert?.address || ""}
      </p>
    </div>
  );
}
