/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import LoggedLink from "./loggedlink/LoggedLink";
import { iconsUrl } from "@/utils/urls";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footerInside}>
        <div className={styles.row}>
          <div className={styles.col}>
            <span className={styles.title}>Majitelé nemovitostí</span>
            <ul className={styles.links}>
              <li>
                <a href={"/inzerat/obecne-informace"}>Vložení spolubydlení</a>
              </li>
              <li>
                <a href={"/sluzby"}>Ceník</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <span className={styles.title}>O nás</span>
            <ul className={styles.links}>
              <li>
                <a
                  href={"resources/pdf/TermsAndConditions.pdf"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Obchodní podmínky
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.separator} />
      <div className={styles.footerLastLine}>
        <div className={styles.left}>Splubydlení</div>
        <div className={styles.middle}>
          © 2023 Nájemník vpohodě. Všechna práva vyhrazena.
        </div>
        <a href="#" className={styles.goUp}>
          <img
            loading="lazy"
            alt="go-up"
            src={`${iconsUrl}/general/go-up.svg`}
          />
        </a>
      </div>
    </footer>
  );
}
