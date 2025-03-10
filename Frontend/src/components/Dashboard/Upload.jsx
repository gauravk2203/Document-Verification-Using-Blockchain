import React, { useState } from "react";
import styles from "./upload.module.css";

export const Upload = ({ setFile }) => {
  const [fileName, setFileName] = useState("Please upload a copy of valid identification");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file
    if (selectedFile) {
      setFile(selectedFile); // Update file state in the parent component
      setFileName(selectedFile.name); // Update file name in local state
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <img src="../../src/assets/uploadICON.svg" alt="Upload Icon" />
      </div>
      <p>{fileName}</p> {/* Display the selected file name */}
      <label htmlFor="file">
        <input type="file" id="file" name="file" style={{ display: "none" }} onChange={handleFileChange} />
        <span className={styles.button}>Upload</span>
      </label>
    </div>
  );
};
