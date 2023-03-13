import styles from "./AdvertTable.module.scss";
import { map, join, filter } from "lodash";
import React, { useEffect } from "react";
import sanitizeHtml from "sanitize-html";
import $c from "../../../utils/currencyFormatter";
import { energeticClass } from "@/utils/energeticClass";
import {
  AccountBalanceWallet,
  Bed,
  Bolt,
  Crop,
  Dashboard,
  Money,
  Payment,
  Stairs,
} from "@mui/icons-material";

export default function AdvertTable({ advert, parametersTable }) {
  useEffect(() => {
    console.log(advert, parametersTable);
  }, [advert, parametersTable]);

  function switchIcon(value) {
    switch (value.title) {
      case "Dispozice":
        return <Dashboard />;
      case "Patro":
        return <Stairs />;
      case "Vybavenost":
        return <Bed />;
      case "Energetická třída":
        return <Bolt />;
      case "Výměra":
        return <Crop />;
      case "Cena":
        return <Payment />;
      case "Poplatky":
        return <Money />;
      case "Kauce":
        return <AccountBalanceWallet />;

      default:
        break;
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <tbody>
          {map(parametersTable, (value, key) => {
            function description() {
              const stringValue = `${advert[key] ?? ""} ${
                value?.suffix || ""
              }<sup>${value?.sub || ""}</sup>`;
              if (value.title === "Vybavenost") {
                return join(advert[key], ", ");
              }
              if (value.title == "Energetická třída") {
                return energeticClass.find((item) => {
                  return item.value === advert[key];
                })?.desc;
              }
              if (value.suffix === "Kč" && typeof advert[key] === "number") {
                return $c(advert[key]);
              }
              return stringValue;
            }

            return (
              <tr>
                <th className={styles.heading}>
                  {switchIcon(value)}
                  {value?.title}
                </th>
                <td
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(description()),
                  }}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
