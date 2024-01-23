import React from "react";
import styles from './styles.module.css'
import { Attendee } from "../../MeetingParticipants/Attendee";

// export enum Participant {
//     Student,
//     Tutor
// }

interface InitialIconProps {
    first: string;
    last: string;
    type: Attendee
}

export const InitialIcon: React.FC<InitialIconProps> = ({ 
    first,
    last,
    type
 }) => {
    return (
        <div className={styles.circle}>
            <p className={type === Attendee.Student ? styles.student : styles.tutor}>{first}{last}</p>
        </div>
    )
}