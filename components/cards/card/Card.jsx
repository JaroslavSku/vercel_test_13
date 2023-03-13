import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import time_ago from "@/utils/timeAgo";
import $c from "@/utils/currencyFormatter";
import Hearts from "@/components/hearts/Hearts";
import renderImages from "@/utils/renderSmallPeopleImages";
import { iconsUrl, peopleIconsUrl } from "@/utils/urls";
import Link from "next/link";
import { useRouter } from "next/router";
import { addPersonAvatar } from "@/utils/addPersonAvatar";
import { addDefaultImage } from "@/utils/addDefaultImage";

export default function Card({ advert }) {
  const src = `${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert.images[0].src}`;
  const personSrc = `${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert?.creator?.imageUrl}`;
  const heart = useRef(null);
  const router = useRouter();
  const correctAddres =
    advert?.address?.replace(/[,\s]+|\s+|[,\/]|[,\s]+/g, "-") || "bez";

  function handleClick(e) {
    if (advert._id && !heart?.current?.contains(e.target)) {
      router.push(`/inzerat/${correctAddres}/${advert._id}`);
    }
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <div ref={heart}>
        <Hearts id={advert._id} />
      </div>
      <div className={styles.imageContainer}>
        <Image
          alt="ubytovani"
          layout="fill"
          objectFit="cover"
          src={`${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert.images[0].src}`}
          loader={() => src}
        />
      </div>
      <div className={styles.body}>
        <div>
          <h3 className={styles.title}>
            <Link href={`/inzerat/${correctAddres}/${advert._id}`}>
              {advert?.title || "Spolubydlení"}
            </Link>
          </h3>
          <div className={styles.addressLine}>
            <span>{advert.address}</span>
            <div>{advert?.searchedPerson && renderImages(advert)}</div>
          </div>
        </div>
        <div className={styles.middleLine}>
          <span>
            <strong>{$c(advert.rent)}</strong>
          </span>
          <span>{new Date(advert.createdAt).toDateString()}</span>
          <span>
            <strong>
              {advert.size} m<sup>2</sup>
            </strong>
          </span>
        </div>
        <div>
          <div className={styles.lastLine}>
            <div className={styles.imageWidget}>
              <div className={styles.userImageContainer}>
                <img
                  alt="ubytovani"
                  onError={addPersonAvatar}
                  src={
                    advert?.creator
                      ? `${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert?.creator?.imageUrl}`
                      : `${iconsUrl}/people/avatar-person.svg`
                  }
                />
              </div>
              <span>{advert?.creator?.name || ""}</span>
            </div>

            <div className={styles.onlineTime}>
              Online &nbsp;
              <span>{time_ago(new Date(advert.createdAt))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
