/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { map } from "lodash";
import styles from "./Inzerce.module.scss";
import Link from "next/link";
import MyAdvert from "../adverts/myad/MyAdvert";
import { iconsUrl } from "@/utils/urls";

function Inzerce({
  myAds,
  displayTopButtons,
  title,
  showHearts,
  addLink,
  allowEdit,
}) {
  const heart = useRef(null);

  return (
    <div>
      <h2>{title}</h2>
      <div className={styles.container}>
        {map(myAds, (advert) => {
          return (
            <MyAdvert
              adv={advert}
              allowEdit={allowEdit}
              displayTopButtons={displayTopButtons}
              showHearts={showHearts}
            />
          );
        })}
        {addLink && (
          <Link
            className={styles.icon}
            href="/inzerat/obecne-informace"
            passHref
          >
            <div>
              <img
                className={styles.iconImage}
                src={`${iconsUrl}/general/add.svg`}
                alt="add icon"
              />
              <span className={styles.addTitle}>Přidat inzerát</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Inzerce;
