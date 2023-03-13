import React, { useMemo } from "react";
import { mapBadgeType } from "../../utils/badgeTypeMap";
import styles from "./Badges.module.scss";

export default function Badges({ badgeType }) {
  const backGroundColor = useMemo(() => {
    switch (badgeType) {
      case 1 || undefined || "":
        return "transparent";
      case 2:
        return "#f36533";
      case 3:
        return "#87bc23";
      case 4:
        return "lightblue";

      default:
        return "transparent";
    }
  }, [badgeType]);

  return (
    <span className={styles.badge} style={{ backgroundColor: backGroundColor }}>
      {mapBadgeType[badgeType]}
    </span>
  );
}
