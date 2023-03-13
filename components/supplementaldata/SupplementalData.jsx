import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import translate from "../../utils/supplementalDataTable";
import CustomInput from "./custominput/CustomInput";
import styles from "./SupplementalData.module.scss";
import SwitchButton from "./switchbutton/SwitchButton";
import * as Yup from "yup";
import axios from "axios";
import TitleColumn from "./columns/titlecolumn/TitleColumn";
import ValueColumn from "./columns/valuecolumn/ValueColumn";
import { regexBirthId } from "../../utils/regex";

export default function SupplementalData({ data, title, showButton }) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const birthday =
    Object.keys(data).length !== 0 && data?.birthday
      ? new Date(data?.birthday).toISOString().substr(0, 10)
      : null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      birthday: birthday || "",
      birthId: data?.birthId || "",
      household: data?.household || "",
      nationality: data?.nationality || "",
      employment: data?.employment || "",
      education: data?.education || "",
      smoker: data?.smoker || "",
      animals: data?.animals || "",
      comment: data?.comment || "",
      allowSubmitting: false,
    },
    validationSchema: Yup.object({
      education: Yup.string(),
      birthId: Yup.string().matches(regexBirthId, {
        message: "Musí obsahovat 10 čísel bez lomítka.",
        excludeEmptyString: true,
      }),
      allowSubmitting: Yup.bool().oneOf([true], "Není povoleno odeslat data."),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/tenants/update`, values)
        .then((_) => {
          setLoading(false);
          setEdit(false);
        })
        .catch((err) => {
          setLoading(false);
          setEdit(false);
          console.log(err);
        });
    },
  });
  console.log("formik errors", formik.errors);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>{title}</h2>
        <div className={styles.body}>
          {formik.values &&
            Object.entries(translate).map(([id, _]) => {
              return (
                <div
                  className={id !== "comment" ? styles.line : styles.comment}
                  key={id}
                >
                  <TitleColumn translate={translate} id={id} />
                  <ValueColumn edit={edit} data={formik.values} id={id} />
                  <CustomInput
                    type={translate[id].input}
                    options={translate[id].options}
                    formik={formik}
                    name={id}
                    edit={edit}
                  />
                </div>
              );
            })}
          <SwitchButton
            show={showButton}
            formik={formik}
            change={edit}
            loading={loading}
            edit={() => {
              setEdit(true);
            }}
          />
        </div>
      </form>
    </div>
  );
}
