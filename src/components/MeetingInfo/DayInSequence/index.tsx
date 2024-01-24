import React from "react";
import styles from './styles.module.css'

interface DayProps {
    inSequence: boolean
    display: string
}

export const DayInSequence: React.FC<DayProps> = ({ inSequence, display }) => {
    return (
        <div className={inSequence ? styles.inSequence : styles.notInSequence}>
            {display}
        </div>
    )
}