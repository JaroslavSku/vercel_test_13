import React, { useState, useEffect, useRef } from "react";
import { map, debounce } from "lodash";
import axios from "axios";
import { iconsUrl } from "@/utils/urls";

function AutocompleteCities({ formik, label, name, styles }) {
  const [suggestions, setSuggestions] = useState();
  const [show, setShow] = useState(false);
  const autocompleteRef = useRef(null);
  function pressEscape(e) {
    if (e.key === "Escape") {
      //Do whatever when esc is pressed
      setShow(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", pressEscape, false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", pressEscape, false);
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
        data: { cities: newPredictions },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/cities`,
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
    formik.setFieldValue("placeId", undefined);
    formik.setFieldValue(name, text);
    delayedQuery(text);
  }

  function handleClick(uid, value) {
    console.log("clicked uid", uid);
    setShow(false);
    formik.setFieldValue("placeId", uid);
    formik.setFieldValue(name, value);
    formik.handleSubmit();
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
          placeholder="Praha"
          onChange={onChange}
          onClick={() => setShow(true)}
          autoComplete="off"
          value={formik.values[name]}
          style={formik.errors[name] ? styleError : null}
        />
        {suggestions?.length > 0 && (
          <ul
            className={styles.list}
            style={{ display: show ? "block" : "none" }}
          >
            {map(suggestions, ({ name, uid }) => {
              return (
                <li
                  onClick={() => {
                    handleClick(uid, name);
                  }}
                  className={styles.listItem}
                >
                  <span className={styles.icon}>
                    <img
                      alt="search place icon"
                      src={`${iconsUrl}/general/place.svg`}
                    />
                  </span>
                  <small>{name}</small>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AutocompleteCities;
