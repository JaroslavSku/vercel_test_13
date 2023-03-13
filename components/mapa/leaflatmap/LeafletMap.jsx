import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

function LeafletMap({ point, zoom, scrollWheelZoom, children }) {
  const mapRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    function getInBounds() {
      if (mapRef.current && groupRef.current) {
        const map = mapRef.current; //get native Map instance
        const group = groupRef.current; //get native featureGroup instance
        console.log("references", mapRef, groupRef);
        map.fitBounds(group.getBounds());
      }
    }

    const timeOutId = setTimeout(() => getInBounds(), 2000);
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <MapContainer
      ref={mapRef}
      center={point}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=fRUnkfoUG6ugSY0SCVDZ"
      />
      <FeatureGroup ref={groupRef}>{children}</FeatureGroup>
    </MapContainer>
  );
}

export default LeafletMap;
