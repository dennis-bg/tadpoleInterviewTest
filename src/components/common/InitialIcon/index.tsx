import React from "react";
import styles from './styles.module.css'

export enum Participant {
    Student,
    Tutor
}

interface InitialIconProps {
    first: string;
    last: string;
    type: Participant
}

export const InitialIcon: React.FC<InitialIconProps> = ({ 
    first,
    last,
    type
 }) => {
    return (
        <div className={styles.circle}>
            <p className={type === Participant.Student ? styles.student : styles.tutor}>{first}{last}</p>
        </div>
    )
}