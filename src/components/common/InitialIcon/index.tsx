import React from "react";
import styles from './styles.module.css'
import { Attendee } from "../../MeetingParticipants/Attendee";
import { AddAttendeeSVG } from "../../../svgs/addAttenndee";

// export enum Participant {
//     Student,
//     Tutor
// }

interface InitialIconProps {
    first: string;
    last: string;
    type: Attendee;
    newAttendee: boolean
}

export const InitialIcon: React.FC<InitialIconProps> = ({ 
    first,
    last,
    type,
    newAttendee
 }) => {

    const getInsideStyle = () => {
        if(newAttendee){
            if(type === Attendee.Student){
                return styles.newStudent;
            } else {
                return styles.newTutor;
            }
        } else {
            if(type === Attendee.Student){
                return styles.student;
            } else {
                return styles.tutor;
            }
        }
    }

    const getBorderStyle = () => {
        if(newAttendee){
            if(type === Attendee.Student){
                return styles.newStudentCircle;
            } else {
                return styles.newTutorCircle;
            }
        } else {
            return styles.circle;
        }
    }

    return (
        <div className={getBorderStyle()}>
            {newAttendee
                ? <AddAttendeeSVG/>
                : <p className={getInsideStyle()}>{first}{last}</p>
            }
        </div>
    )
}