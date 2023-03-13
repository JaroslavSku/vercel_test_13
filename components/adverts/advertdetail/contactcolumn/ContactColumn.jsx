import React from "react";
import { parametersTable } from "../../../../utils/parametry";
import { map } from "lodash";
import ProfileImage from "../../../profileimage/ProfileImage";
import styles from "./ContactColumn.module.scss";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ContactMailIcon from "@material-ui/icons/ContactMail";
export default function ContactColumn({ data, address, imageUrl, updatedAt }) {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <ProfileImage
          url={imageUrl}
          timeStamp={updatedAt}
          imgCss={styles.profileImage}
        />
        <div className={styles.address}>
          <p>{address}</p>
        </div>
      </div>
      <div className={styles.table}>
        <h5 className={styles.paramTitle}>
          <ContactSupportIcon />
          Parametry:
        </h5>

        <table className={styles.dataTable}>
          <tbody>
            {/* {map(parametersTable, (value, key) => {
              console.log("radek 30", value, key);
              return (
                <tr>
                  <th>{value}</th>
                  <td>{data[key]}</td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
      <div className={styles.contact}>
        <button className={styles.contactBtn}>
          <ContactMailIcon />
          Poslat zprávu pronajímateli
        </button>
      </div>
    </div>
  );
}
