import {ReactNode} from "react";
import styles from './SVG.module.scss'

interface SVGProps {
    size: number;
    children: ReactNode
    color?: string
}


const SVG = (props: SVGProps) => {
    const {
        size,
        children,
        color = "#000"
    } = props;
    return (
        <div
            className={styles.svg}
            style={{
                width: size + 'px',
                height: size + 'px',
            }}
        >
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill={color} // Вот здесь применяется цвет fill
            >
                {children}
            </svg>
        </div>
    )
}
export default SVG;
