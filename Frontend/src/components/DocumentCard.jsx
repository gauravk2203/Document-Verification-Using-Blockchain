import React from "react";
import styles from "./DocumentCard.module.css";

export const DocumentCard = ({ document, addToVault }) => {
  if (!document) return null;

  return (
    <div className={styles["document-card"]}>
      <h3>Fetched Document</h3>
      <p>{document.name}</p>
      <button onClick={addToVault} className={styles["add-vault-btn"]}>
        Add to My Vault
      </button>
    </div>
  );
};
