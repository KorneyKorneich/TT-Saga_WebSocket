import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    setValue: (value: string) => void; // Accept the input value as an argument
}

export const Input: React.FC<InputProps> = ({ setValue, ...rest }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value); // Pass the input value to the setValue function
    };

    return <input onChange={handleChange} {...rest} />;
};
