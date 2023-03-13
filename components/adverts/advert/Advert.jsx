/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { map } from "lodash";
import Carousel from "../../carousel/Carousel";
import AdvertEquipment from "../advertequipment/AdvertEquipment";
import styles from "./Advert.module.scss";

import { useRouter } from "next/router";
import Hearts from "../../hearts/Hearts";
import Badges from "../../badges/Badges";
import { iconsUrl } from "@/utils/urls";

function Advert({ slides, advertData, handleLogin }) {
  const router = useRouter();
  const { equipment = [] } = advertData;
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const heart = useRef(null);

  function addDefaultImage(e) {
    e.target.src = `${iconsUrl}/upload-empty.png`;
  }

  function handleClick(e) {
    if (
      advertData._id &&
      !leftArrow?.current?.contains(e.target) &&
      !rightArrow?.current?.contains(e.target) &&
      !heart?.current?.contains(e.target)
    ) {
      const correctAddres =
        advertData?.address?.replace(/[,\s]+|\s+|[,\/]|[,\s]+/g, "-") || "bez";
      router.push(`/inzerat/${correctAddres}/${advertData._id}`);
    }
  }

  function renderImages() {
    if (advertData?.images?.length > 0) {
      return map(advertData.images, (image, index) => {
        const url = `${process.env.NEXT_PUBLIC_REACT_BE_API}/${image.src}`;
        return (
          <img
            loading="lazy"
            className={styles.carouselImage}
            src={url}
            onError={addDefaultImage}
            alt={`rented apartment ${image?.originalName || ""}`}
            key={index}
          />
        );
      });
    } else {
      return (
        <img
          loading="lazy"
          className={styles.carouselImage}
          src={`${iconsUrl}/upload-empty.png`}
          onError={addDefaultImage}
          alt="empty image"
        />
      );
    }
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <Carousel
        ref={{
          leftArrow,
          rightArrow,
        }}
        slides={slides}
      >
        {renderImages()}
      </Carousel>
      <div className={styles.body}>
        <div className={styles.description}>
          {advertData?.badgeType && <Badges badgeType={advertData.badgeType} />}
          <p className={styles.address}>{advertData.address}</p>
          <p className={styles.detail}>
            {`Pronájem ${advertData.layout} ${advertData.size}`} m<sup>2</sup>
          </p>
          <p className={styles.rent}>{advertData?.rent?.toLocaleString()} Kč</p>
        </div>
        <div>
          <Hearts
            heart={heart}
            id={advertData?._id || ""}
            handleLogin={handleLogin}
          />
        </div>
      </div>
      <div className={styles.advertEquipment}>
        {equipment?.length > 1 &&
          map(equipment, (unit, index) => {
            return <AdvertEquipment key={index} equipment={unit} />;
          })}
      </div>
    </div>
  );
}
export default Advert;
