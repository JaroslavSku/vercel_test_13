import React, { useRef } from "react";
import Image from "next/image";
import styles from "./FavoriteItem.module.scss";
import time_ago from "@/utils/timeAgo";
import $c from "@/utils/currencyFormatter";
import Hearts from "@/components/hearts/Hearts";
import renderImages from "@/utils/renderSmallPeopleImages";
import { peopleIconsUrl } from "@/utils/urls";
import Link from "next/link";
import { useRouter } from "next/router";
import { addDefaultImage } from "@/utils/addDefaultImage";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { includes } from "lodash";
import {
  addHeart,
  deleteHeart,
  addHeartUnregistered,
  deleteHeartUnregistered,
  autoLoginFavorites,
} from "../../../redux/actions/userActions";

export default function FavoriteItem({ advert, editable, index }) {
  const src = `${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert.images[0].src}`;
  const heart = useRef(null);
  const deleteRef = useRef(null);
  const dispatch = useDispatch();
  const likesAds = useSelector((state) => state.auth.likesAds);
  const { token = null } = useSelector((state) => state.auth);
  const router = useRouter();
  const correctAddres =
    advert?.address?.replace(/[,\s]+|\s+|[,\/]|[,\s]+/g, "-") || "bez";

  function handleClick(e) {
    if (
      advert._id &&
      !heart?.current?.contains(e.target) &&
      !deleteRef?.current?.contains(e.target)
    ) {
      router.push(`/inzerat/${correctAddres}/${advert._id}`);
    }
  }

  function deleteFromFavorites() {
    const id = advert._id;
    let favorites = [];

    if (includes(likesAds, id)) {
      dispatch(deleteHeartUnregistered(id));
      if (localStorage.getItem("favorites")) {
        favorites = JSON.parse(localStorage.getItem("favorites"));
      }
    }
    router.push({
      pathname: "/oblibene",
      query: { fav: JSON.stringify(favorites) },
    });
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          alt="ubytovani"
          layout="fill"
          objectFit="cover"
          src={`${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert.images[0].src}`}
          loader={() => src}
        />
        <div ref={heart}>
          <Hearts editable={editable} id={advert._id} />
        </div>
        <div className={styles.marker}>{index + 1}</div>
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
                <Image
                  alt="ubytovani"
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  src={`${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert?.creator?.imageUrl}`}
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert?.creator?.imageUrl}`
                  }
                />
              </div>
              <span>{advert?.creator?.name}</span>
            </div>

            <div className={styles.onlineTime}>
              Online &nbsp;
              <span>{time_ago(new Date(advert.createdAt))}</span>
            </div>

            <div ref={deleteRef} onClick={deleteFromFavorites}>
              <Delete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
