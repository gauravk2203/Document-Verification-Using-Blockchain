import React from "react";
import styles from "./RecentUpload.module.css"; // Import CSS file

export const RecentUpload = ({ student = {} }) => {
    const documents = Array.isArray(student) ? student : student.documents || [student];

    console.log("Documents Array:", documents);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Documents</h2>
            {documents.length > 0 ? (
                <div className={styles["table-container"]}>
                    <table className={styles["styled-table"]}>
                        <thead>
                            <tr className={styles["table-header-row"]}>
                                <th className={styles["table-header-cell"]}>Document Name</th>
                                <th className={styles["table-header-cell"]}>Hash</th>
                                <th className={styles["table-header-cell"]}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc, index) => (
                                <tr key={index} className={styles["table-body-row"]}>
                                    <td className={styles["table-body-cell"]}>{doc.documentName}</td>
                                    <td className={`${styles["table-body-cell"]} ${styles.hash}`}>{doc.documentHash}</td>
                                    <td className={styles["table-body-cell"]}>{new Date(doc.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No documents found.</p>
            )}
        </div>
    );
};
