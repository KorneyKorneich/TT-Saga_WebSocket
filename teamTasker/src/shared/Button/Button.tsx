import {ButtonHTMLAttributes, ReactNode} from "react";
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    clickHandler?:() => void;
    children?: ReactNode;
    className?: string
}


export const Button = (props: ButtonProps) => {
    const {
        children,
        clickHandler,
        className,
        ...otherProps
    } = props;
    return(
        <button className={`${styles.button} ${className}`} onClick={clickHandler} {...otherProps}>
            {children}
        </button>
    )
}
