import React, { useEffect, useState } from "react";
import { map } from "lodash";
import styles from "./NearbyPlaces.module.scss";
import axios from "axios";

export default function NearbyPlaces({ advertId }) {
  const [places, setplaces] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const {
        data: { places },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/nearby`,
        {
          params: {
            advertId,
          },
        }
      );
      setplaces(places);
      console.log("nearby", places);
    }
    fetchData();
  }, [advertId]);

  return (
    <div className={styles.container}>
      {places
        .sort((a, b) => a.distance - b.distance)
        .map((place) => {
          return (
            <div key={place._id} className={styles.line}>
              <div className={styles.typeBloc}>
                <div className={styles.type}>Obchod</div>
                <div className={styles.place}>{place.name} </div>
              </div>
              <div className={styles.distance}>
                &#x1f6b6; {place.distance} m&nbsp;
                <span className={styles.time}>({place.minutes} min)</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
