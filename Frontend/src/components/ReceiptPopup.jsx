import React from "react";
import styles from "./ReceiptPopup.module.css"; // Create this CSS file

export const ReceiptPopup = ({ receiptData, onClose }) => {
    if (!receiptData) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2>Blockchain Receipt</h2>
                <p><strong>Transaction Hash:</strong> {receiptData.transactionHash}</p>
                <p><strong>Block Number:</strong> {receiptData.blockNumber}</p>
                <p><strong>Gas Used:</strong> {receiptData.gasUsed}</p>
                <p><strong>Timestamp:</strong> {new Date(receiptData.timestamp).toLocaleString()}</p>
                <button className={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
