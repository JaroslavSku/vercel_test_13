import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CustomInput from "../supplementaldata/custominput/CustomInput";
import styles from "./SearchMenu.module.scss";
import StandardInput from "../formik/standardinput/StandardInput";
import { useRouter } from "next/router";
import { gender } from "@/utils/genderMap";
import { forEach } from "lodash";
import AutocompleteCities from "../autocompletecities/AutoCompleteCities";

function SearchMenu({ adverts }) {
  const [slideNr, setSlideNr] = useState(3);
  const router = useRouter();

  useEffect(() => {
    function changeSlideNumber() {
      if (window) {
        const viewPortWidth = window.innerWidth;
        switch (true) {
          case viewPortWidth < 1000:
            setSlideNr(1);
            break;
          case viewPortWidth < 1200:
            setSlideNr(2);
            break;
          default:
            setSlideNr(3);
        }
      }
    }
    window.addEventListener("resize", changeSlideNumber);
    return () => {
      window.removeEventListener("resize", changeSlideNumber);
    };
  }, []);

  const [show, setShow] = useState(false);
  function addToParams(values) {
    let params = new URLSearchParams();
    forEach(values, (value, key) => {
      params.append(key, value);
    });
    return params;
  }
  const formik = useFormik({
    initialValues: {
      priceFrom: "",
      priceTo: "",
      predictionSearch: "",
      gender: "both",
    },
    onSubmit: (values) => {
      const params = addToParams(values);
      console.log("search started", params);
      router.push({
        query: params.toString(),
      });
    },
  });

  return (
    <div className={styles.searchNav}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.line}>
          {/* <CustomInput
            type="select"
            options={cities}
            formik={formik}
            name="city"
            customBorder="none"
            selectAppearence="none"
            containerWidth="10rem"
            edit
          /> */}
          {/* <Autocomplete2
            name="predictionSearch"
            geoEnabled
            formik={formik}
            className={styles.input}
            styles={styles}
          /> */}
          <AutocompleteCities
            name="predictionSearch"
            geoEnabled
            formik={formik}
            className={styles.input}
            styles={styles}
          />
          <CustomInput
            type="select"
            options={gender}
            formik={formik}
            name="gender"
            customBorder="none"
            selectAppearence="none"
            containerWidth="8rem"
            edit
          />
          <StandardInput
            placeholder="Max cena"
            type="number"
            name="priceTo"
            id="priceTo"
            backLabel="Kč"
            formik={formik}
            groupWidth="10rem"
            border="none"
          />
          <StandardInput
            placeholder="Min Velikost"
            backLabel="m"
            sup="2"
            formik={formik}
            type="number"
            name="sizeFrom"
            id="sizeFrom"
            groupWidth="10rem"
            border="none"
          />
        </div>

        <div className={styles.buttonLine}>
          <span className={styles.icon} onClick={() => setShow(!show)}>
            Klikni
          </span>
          <button className={styles.submit} type="submit">
            Vyhledat
          </button>
          <span />
        </div>
      </form>
    </div>
  );
}

export default SearchMenu;
