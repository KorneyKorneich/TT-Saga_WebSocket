import React, { InputHTMLAttributes } from 'react';
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    setValue?: (value: string) => void; // Accept the input value as an argument
}

export const Input: React.FC<InputProps> = ({ ...rest }) => {
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.target.value); // Pass the input value to the setValue function
    // };

    return <input className={styles.input} {...rest} />;
};
