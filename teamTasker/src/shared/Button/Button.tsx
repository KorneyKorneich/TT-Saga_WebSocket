import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from './Button.module.scss'

export enum ButtonStyles {
    PRIMARY = "prymary",
    OUTLINE = "outline",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    clickHandler?: () => void;
    children?: ReactNode;
    className?: string
    buttonStyle?: ButtonStyles
}


const Button = (props: ButtonProps) => {
    const {
        children,
        clickHandler,
        className,
        buttonStyle = "primary",
        ...otherProps
    } = props;
    return (
        <button className={`${styles.button} ${className} ${styles[buttonStyle]}`}
                onClick={clickHandler} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;
