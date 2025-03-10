import React from "react";
import styles from "./StudentList.module.css"; // Import the CSS file

export const StudentList = ({ onClick, students }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Students</div>
            <hr />
            <div className={styles["search-container"]}>
                <input type="search" className={styles["search-input"]} placeholder="Search by name" />
            </div>
            <div className={styles["table-container"]}>
                <table className={styles["styled-table"]}>
                    <thead>
                        <tr className={styles["table-header-row"]}>
                            <th className={styles["table-header-cell"]}>Student Name</th>
                            <th className={styles["table-header-cell"]}>Batch</th>
                            <th className={styles["table-header-cell"]}>Branch</th>
                            <th className={styles["table-header-cell"]}>PID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className={styles["table-body-row"]} onClick={() => onClick(student)}>
                                <td className={styles["table-body-cell"]}>{student.studentName}</td>
                                <td className={styles["table-body-cell"]}>{student.batch}</td>
                                <td className={styles["table-body-cell"]}>{student.course}</td>
                                <td className={styles["table-body-cell"]}>{student.pid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
