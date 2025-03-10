import React, { useState } from "react";
import style from "./DocInput.module.css"; // Import the CSS file

export const DocInput = ({ setInputData, onSubmit }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
        setInputData(event.target.value); // Update the parent state
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>Enter Document Name</h2>
            <div className={style["input-container"]}>
                <input 
                    className={style["styled-input"]} 
                    placeholder="Ex. Degree_Doc" 
                    value={inputValue} 
                    onChange={handleChange} 
                />
                <button className={style["styled-button"]} onClick={onSubmit}>Save</button>
            </div>
        </div>
    );
};
