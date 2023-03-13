import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { map, debounce } from "lodash";
import axios from "axios";

function Autocomplete2({
  formik,
  label,
  geoEnabled,
  name,
  styles,
  onRouterPush,
}) {
  const [suggestions, setSuggestions] = useState();
  const [show, setShow] = useState(false);
  const [inputValue, setValue] = useState();
  const autocompleteRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside({ target }) {
    if (autocompleteRef && !autocompleteRef.current.contains(target)) {
      setShow(false);
    }
  }

  const delayedQuery = useRef(debounce((q) => handleSearch(q), 500)).current;

  async function handleSearch(text) {
    try {
      const {
        data: {
          data: { predictions: newPredictions },
        },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/autocomplete`,
        {
          params: {
            q: text,
          },
        }
      );
      console.log("new predictions", newPredictions);
      setSuggestions(newPredictions);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(e) {
    const text = e.target.value;
    formik.setFieldValue(name, text);
    delayedQuery(text);
  }

  async function handleGeoSearch(placeId) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/geocode`,
        {
          params: {
            placeId,
          },
        }
      );
      console.log("data geo", data);
      const latitude = data?.geodata?.location?.lat || 0;
      const longitude = data?.geodata?.location?.lng || 0;
      formik.setFieldValue("area1", data?.area1);
      formik.setFieldValue("area2", data?.area2);
      console.log("lat, long", latitude, longitude);
      formik.setFieldValue("latitude", latitude);
      formik.setFieldValue("longitude", longitude);

      formik.setFieldValue("placeId", placeId);
      onRouterPush(latitude, longitude, placeId);
    } catch (error) {
      console.log(error);
    }
  }
  function handleClick(place_id, value) {
    setValue(value);
    console.log("clicked");
    setShow(false);
    formik.setFieldValue(name, value);
    if (geoEnabled) {
      handleGeoSearch(place_id);
    }
  }
  const styleError = {
    border: "1px solid #e33e44",
  };
  return (
    <div ref={autocompleteRef} className={styles.autocompleteContainer}>
      <div className={styles.autocomplete}>
        {label && (
          <label htmlFor="location" className={styles.label}>
            {label}
          </label>
        )}
        <input
          type="text"
          id="locationInput"
          name="locationInput"
          className={styles.searchInput}
          placeholder="Zadejte adresu"
          onChange={onChange}
          onClick={() => setShow(true)}
          autoComplete="off"
          value={formik.values[name]}
          style={formik.errors[name] ? styleError : null}
        />
        <ul
          className={styles.list}
          style={{ display: show ? "block" : "none" }}
        >
          {map(suggestions, ({ structured_formatting, place_id }) => {
            const street = structured_formatting?.main_text;
            const secondaryText = structured_formatting?.secondary_text;
            const value = `${street}, ${secondaryText}`;
            return (
              <li
                onClick={() => {
                  handleClick(place_id, value);
                }}
                className={styles.listItem}
              >
                <span className={styles.icon}></span>
                <small>{street}</small>
                <small>{`, ${secondaryText}`}</small>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Autocomplete2;
