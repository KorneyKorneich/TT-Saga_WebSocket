import { ReactNode } from "react";
import styles from './SVG.module.scss'

interface SVGProps {
    size: number;
    children: ReactNode
    color?: string
}


export const SVG = (props: SVGProps) => {
    const {
        size,
        children,
        color = "#000"
    } = props;
    return (
        <div className={styles.svg} style={
            {
                width: size+'px',
                height: size+'px',
                fill: color
        }}>
            {children}
        </div>
    )
}
