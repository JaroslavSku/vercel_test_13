import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import icon from "./leafleticon/LeafletIcon";
import L from "leaflet";
import styles from "./Map.module.scss";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

const LazyMarker = dynamic(async () => (await import("react-leaflet")).Marker, {
  ssr: false,
});
// const MarkerClusterGroup = dynamic(
//   async () => await import("react-leaflet-markercluster").MarkerClusterGroup,
//   {
//     ssr: false,
//   }
// );
const LeafletMap = dynamic(() => import("./leaflatmap/LeafletMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});
function Map({ startMarkers, point, zoom, scrollWheelZoom }) {
  return (
    <LeafletMap point={point} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>
      <MarkerClusterGroup>
        {startMarkers &&
          startMarkers.map((marker, index) => {
            const correctedIndex = index + 1;
            return (
              <LazyMarker
                icon={L.divIcon({
                  className: styles.marker,
                  html: correctedIndex,
                })}
                position={[marker.latitude, marker.longitude]}
                key={marker?._id ? marker._id : index}
              ></LazyMarker>
            );
          })}
      </MarkerClusterGroup>
    </LeafletMap>
  );
}

export default Map;
