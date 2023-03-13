import React, { useEffect } from "react";
import FavoriteItem from "./favorite/FavoriteItem";

export default function Favoriteitems({ items, editable }) {
  useEffect(() => {
    console.log("it", items);
  }, []);

  return (
    <div>
      {items.map((item, index) => {
        return (
          <FavoriteItem
            key={item._id}
            index={index}
            editable={editable}
            advert={item}
          />
        );
      })}
    </div>
  );
}
