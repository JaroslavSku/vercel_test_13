import L from "leaflet";
import styles from "./LeafletIcon.module.scss";

// const icon = new L.Icon({
//   iconUrl: "/icons/general/map-house.svg",
//   iconRetinaUrl: "/icons/general/map-house.svg",
//   iconSize: [70, 70],
// });

const icon = L.divIcon({
  className: styles.marker,
});

export default icon;
