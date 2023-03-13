import React from "react";
import { useSelector } from "react-redux";
import {
  adminSideMenuLinks,
  najemnikSideMenuLinks,
  pronajimatelSideMenuLinks,
} from "../../../utils/links";
import SideMenu from "../sidemenu/SideMenu";
import styles from "./SideMenuLayout.module.scss";

export default function SideMenuLayout({ children }) {
  const links = useSelector((state) =>
    state.auth.level === "admin"
      ? adminSideMenuLinks
      : state.auth.userType === "pronajimatel"
      ? pronajimatelSideMenuLinks
      : najemnikSideMenuLinks
  );
  return (
    <div className={styles.body}>
      <SideMenu links={links} />
      <section className={styles.main}>{children}</section>
    </div>
  );
}
