import React from "react";
import { IAttendee } from "../../../types/types";
import { InitialIcon } from "../../common/InitialIcon";
import styles from './styles.module.css'
import { AttendenceSVG } from "../../../svgs/attendence";

export enum Attendee {
    Student,
    Tutor
}

interface AttendeeProps {
    showRate: boolean;
    type: Attendee
}

export const AttendeeItem: React.FC<IAttendee & AttendeeProps> = ({ 
    name, 
    rate, 
    showRate,
    type
}) => {

    const names = name.split(' ');

    const attendanceRateDisplay = () => {
        if(showRate) {
            return <span>$ {rate} /hr</span>;
        } else {
            if(type === Attendee.Student){
                return <AttendenceSVG/>
            } else {
                return null;
            }
        }
    }

    return (
        <div className={styles.tutor}>
            <InitialIcon 
                first={names[0].charAt(0)} 
                last={names[names.length-1].charAt(0)} 
                type={type}
            />
            <div className={styles.details}>
                <p>{name}</p>
                {attendanceRateDisplay()}
            </div>
        </div>
    )
}