import React from "react";
import styles from './AddStudent.module.css';

export const AddStudent = ({ onClick }) => {
    return(
    <div className={styles.container} onClick={onClick}>
        <div className={styles.iconContainer}>
            <img src="../../src/assets/uploadICON.svg" alt="" />
        </div>
        <div className={styles["sub-tittle"]}>
            <h2>Add New Student</h2>
            <p>ABC ID is must required</p>
        </div>   
    </div>
    )   
};