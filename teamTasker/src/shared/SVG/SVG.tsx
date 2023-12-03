import { ReactNode } from "react";
import styles from './SVG.module.scss'

interface SVGProps {
    size: number;
    children: ReactNode
}


export const SVG = (props: SVGProps) => {
    const {
        size,
        children
    } = props;
    return (
        <div className={styles.svg} style={
            {
                width: size+'px',
                height: size+'px'
        }}>
            {children}
        </div>
    )
}
