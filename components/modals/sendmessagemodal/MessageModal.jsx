import { useFormik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import { messageToOwner } from "../../../redux/actions/messageActions";
import StandardInput from "../../formik/standardinput/StandardInput";
import Modal from "../Modal";
import styles from "./MessageModal.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import ErrorMessageFormik from "../../formik/errormessage/ErrorMessageFormik";

function MessageModal({
  show,
  close,
  messageToOwner,
  ownerEmail,
  advertId,
  layout,
  onSubmitComplete,
}) {
  function onChange(value) {
    console.log("Captcha value:", value);
    formik.setFieldValue("captcha", value);
  }
  const [infoMessage, setShowInfoMessage] = useState(false);
  const schema = Yup.object({
    tenantEmail: Yup.string()
      .email("Prosím zadejte platný email.")
      .required("Prosím vyplňte Váš email."),
    captcha: Yup.string().required("Potvrďte, že nejste robot."),
    message: Yup.string().required("Prosím vyplňte zprávu.").trim(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      message: "",
      tenantEmail: "",
      captcha: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      values.ownerEmail = ownerEmail;
      values.advertId = advertId;
      values.layout = layout;
      console.log(values);
      const trimmedValues = schema.cast(values);
      messageToOwner(trimmedValues);
      resetForm({});
      if (typeof window !== "undefined") {
        window.grecaptcha.reset();
      }
      close();
      console.log("set to true show");
      onSubmitComplete();
    },
  });
  return (
    <Modal show={show} close={close}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2>Napište zprávu majiteli</h2>

        <div className={styles.body}>
          <StandardInput
            type="tenantEmail"
            name="tenantEmail"
            id="tenantEmail"
            label="Zadejte Váš e-mail"
            formik={formik}
          />
          <label className={styles.label} htmlFor="message">
            Text zprávy
          </label>
          <textarea
            name="message"
            cols="30"
            rows="5"
            onChange={formik.handleChange}
            value={formik.values.message}
            className={styles.textarea}
            id="message-text"
            placeholder="Představte se a napište, o jakou nemovitost máte zájem. Ptejte se na informace, které nezazněly v inzerátu."
          />

          <ReCAPTCHA
            sitekey="6LfqAGsbAAAAAKwT0Tkr_l28i0unxD2iZoCUtm7a"
            onChange={onChange}
            className={styles.recaptcha}
            size="normal"
          />
          <ErrorMessageFormik name="captcha" formik={formik} />
          <div className={styles.modalFooter}>
            <button className={styles.modalBtn} type="submit">
              Odeslat zprávu
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default connect((state) => state, { messageToOwner })(MessageModal);
