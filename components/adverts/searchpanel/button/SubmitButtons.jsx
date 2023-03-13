import { useRouter } from "next/router";
import React from "react";
import styles from "./SubmitButton.module.scss";

export default function SubmitButtons({ disabled, onClick, backButton }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      {backButton && (
        <button
          className={styles.backButton}
          type="cancel"
          id="cancel"
          name="cancel"
          disabled={disabled}
          onClick={() => router.back()}
        >
          Zpět
        </button>
      )}
      <button
        className={styles.submitBtn}
        type="submit"
        id="submit"
        name="submit"
        disabled={disabled}
        onClick={onClick}
      >
        Pokračovat
      </button>
    </div>
  );
}
