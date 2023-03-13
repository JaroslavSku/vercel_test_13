import { useRouter } from "next/router";
import React from "react";
import styles from "./RegistrationPanel.module.scss";

export default function Registration() {
  const router = useRouter();
  function handleRedirect(event) {
    event.preventDefault();
    router.push("/overeni");
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Registrace</h2>
      <ul>
        <li>Registrace a inzerce jsou ZDARMA</li>
        <li>Větší šance získat podnájem / nájemníka</li>
        <li>Možnost vytvoření databáze svých nájemníků</li>
        <li>Všechny služby obdržíte během pár minut v e-mailu</li>
      </ul>
      <button
        className={styles.button}
        onClick={handleRedirect}
        type="submit"
        id="submit"
        name="submit"
      >
        Registrovat se
      </button>
    </div>
  );
}
