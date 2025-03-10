import React from "react";
import styles from "./Document.module.css"; // Import the CSS module

const DocumentCard = React.memo(({ document }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.cardContent}>
        <h4 className={styles.title}>{document?.title || "Untitled Document"}</h4>
        <p className={styles.hash}>Hash: {document?.hash || "N/A"}</p>
        <p className={styles.course}>{document?.course || "Unknown Course"}</p>
        <p className={styles.institution}>{document?.institution || "Unknown Institution"}</p>
        <p className={styles.issueDate}>{document?.issueDate || "Issue Date Unavailable"}</p>
      </div>
    </div>
  );
});

export const MyVault = ({ documents = [] }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Vault</h2>
      {documents.length === 0 ? (
        <p className={styles.noDocs}>No documents found.</p>
      ) : (
        <div className={styles.cardContainer}>
          {documents.map((doc) => (
            <DocumentCard key={doc.hash || Math.random()} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
};
