import React from "react";
import styles from './styles.module.css'
import { DayInSequence } from "../DayInSequence";

export const SequenceDisplay = () => {

    const sequence = {
        S: false,
        M: true,
        T: false,
        W: true,
        Th: false,
        F: true,
        Sa: false
    }

    return (
        <div className={styles.display}>
            {Object.entries(sequence).map(([key, value]) => 
                <DayInSequence inSequence={value} display={key}/>
            )}
        </div>
    )
}