/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import styles from "./Login.module.scss";
import * as Yup from "yup";
import { loginUser, saveRecaptcha } from "../../redux/actions/userActions";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import ErrorMessageFormik from "../formik/errormessage/ErrorMessageFormik";
import axios from "axios";
import InfoMessageBox from "../error/InfoMessageBox";
import Checkbox from "../modals/inputs/check/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import { iconsUrl } from "@/utils/urls";

function Login({ saveRecaptcha, loginUser }) {
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [errorMsg, setErrorMessage] = useState(null);
  const router = useRouter();
  const passwordImg = useRef();
  const submitBtn = useRef();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const styleError = {
    border: "1px solid #e33e44",
  };

  function onChange(recaptchaToken) {
    if (recaptchaToken) {
      axios.defaults.headers.common["Recapture-Token"] = recaptchaToken;
    }
  }

  const recaptchaRef = useRef(null);

  function showPassword() {
    setpasswordVisibility(!passwordVisibility);
  }

  function redirectToSendEmail() {
    router.push("/heslo");
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Neplatný email")
      .required("Zadejte prosím email"),
    password: Yup.string().required("Zadejte prosím heslo"),
  });

  const initialValues = {
    email: "",
    password: "",
    remember: true,
  };

  const handleSubmit = async (values) => {
    try {
      const recaptchaToken = await recaptchaRef.current.executeAsync();
      axios.defaults.headers.common["Recapture-Token"] = recaptchaToken;
      console.log("values", values);
      await loginUser(values);
      if (!localStorage.getItem("rdUser")) {
        router.push("/logout");
      }
      const { userType = null } = JSON.parse(localStorage.getItem("rdUser"));
      if (userType) {
        router.push(`/${userType}/interni/prehled`);
      }
    } catch (response) {
      if (response) {
        setErrorMessage(response.data?.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <InfoMessageBox messageType="error" message={errorMsg} />
      <h2 className={styles.heading}>Přihlášení</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {(props) => (
          <Form className={styles.form}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfqAGsbAAAAAKwT0Tkr_l28i0unxD2iZoCUtm7a"
              onChange={onChange}
              size="invisible"
            />
            <label className={styles.label} htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className={styles.inputText}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
            />

            <ErrorMessageFormik name="email" formik={props} />

            <label className={styles.label} htmlFor="password">
              Heslo
            </label>

            <div className={styles.passwordInputContainer}>
              <input
                id="password"
                name="password"
                type={passwordVisibility ? "password" : "text"}
                className={styles.passwordInpt}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              <img
                onClick={showPassword}
                className={styles.eyeImage}
                alt="eye"
                ref={passwordImg}
                src={`${iconsUrl}/general/eye-close-up.svg`}
              />
            </div>
            <ErrorMessageFormik name="password" formik={props} />
            <p
              className={styles.forgotPasswordText}
              onClick={redirectToSendEmail}
            >
              Zapomenuté heslo
            </p>

            <div className={styles.permanentLogin}>
              <Checkbox
                formik={props}
                value={props.values.remember}
                name="remember"
                labelName=" Zůstat přihlášen"
                styleError={styleError}
              />
            </div>

            <button
              className={styles.button}
              type="submit"
              id="submit"
              name="submit"
              ref={submitBtn}
            >
              Přihlásit se
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default connect((state) => state, { loginUser, saveRecaptcha })(Login);
