import React from "react";
import styles from "./Header.module.css";

export const Header = ({ title, subTitle, pid, abcID }) => {
  return (
    <div className={styles["header-container"]}>  
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
        <h1 className={styles.pid}>({abcID ? abcID : pid})</h1> {/* Render abcID if present, else render pid */}
      </div>
      <p className={styles["sub-title"]}>{subTitle}</p>
    </div>
  );
};
