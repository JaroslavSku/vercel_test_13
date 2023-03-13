import axios from "axios";
import React from "react";

export function useAutocomplete(text = "", timeout = 400) {
  setTimeout(async () => {
    try {
      const {
        data: { data: newPredictions },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/autocomplete`,
        {
          params: {
            q: text,
          },
        }
      );
      console.log("new predictions", newPredictions);
      return newPredictions;
    } catch (error) {
      console.log(error);
    }
  }, timeout);
}
