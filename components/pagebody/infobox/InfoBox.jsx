import Link from "next/link";
import styles from "./InfoxBox.module.scss";
// import { HelpOutlineTwoTone } from "@mui/icons-material";

export default function InfoBox() {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>{/* <HelpOutlineTwoTone /> */}</div>
      <div className={styles.textBox}>
        <h4 className={styles.title}>
          Víte, že je spolubydlení i vhodná možnost jak si přividělat?{" "}
        </h4>
        <div className={styles.messageBody}>
          <b>Náš tip:</b> Využijte možnost inzerovat zdarma na našem portále a
          ukázat Váš inzerát tisícům zájemců.
        </div>
        <Link className={styles.buttonSave} href="/inzerat/obecne-informace">
          Přidat inzerát
        </Link>
      </div>
    </div>
  );
}
