import React from "react";
import styles from './styles.module.css'
import { DayInSequence } from "../DayInSequence";
import { Sequence } from "../../../types/types";

export const SequenceDisplay: React.FC<{sequence: Sequence}> = ({ sequence }) => {
    return (
        <div className={styles.display}>
            {Object.entries(sequence).map(([key, value]) => 
                <DayInSequence inSequence={value} display={key} key={key}/>
            )}
        </div>
    )
}