import { useRouter } from "next/router";
import React from "react";
import styles from "./PasswordChange.module.scss";

export default function PasswordChange() {
  const router = useRouter();
  function redirectToPasswordChange() {
    router.push("/heslo");
  }
  return (
    <div>
      <h3>Změna hesla</h3>
      <div className={styles.passWordChange}>
        <p className={styles.passwordChangeTitle}>
          Informace pro změnu hesla Vám budou odeslány na e-mail.
        </p>
        <button
          onClick={redirectToPasswordChange}
          className={styles.submitBtn}
          id="passwordRecovery"
        >
          Zaslat e-mail pro obnovení hesla
        </button>
      </div>
    </div>
  );
}
