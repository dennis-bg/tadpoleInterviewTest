import React, { useContext } from "react";
import { IAttendee } from "../../../types/types";
import { InitialIcon } from "../../common/InitialIcon";
import styles from './styles.module.css'
import { AttendenceSVG } from "../../../svgs/attendence";
import { EditModeContext } from "../../../store/edit-mode-context";
import { RemoveSVG } from "../../../svgs/remove";
import { Input } from "antd";

export enum Attendee {
    Student,
    Tutor
}

interface AttendeeProps {
    showRate: boolean;
    type: Attendee;
    newAttendee: boolean
}

export const AttendeeItem: React.FC<IAttendee & AttendeeProps> = ({ 
    name, 
    rate, 
    showRate,
    type,
    newAttendee
}) => {

    const { editMode } = useContext(EditModeContext); 

    const names = name.split(' ');

    const attendanceRateDisplay = () => {
        if(newAttendee){
            return null;
        }
        else{
            if(editMode){
                return <RemoveSVG/>
            }
            else if(showRate) {
                return <span>$ {rate} /hr</span>;
            } else {
                if(type === Attendee.Student){
                    return <AttendenceSVG/>
                } else {
                    return null;
                }
            }
        } 
    }

    return (
        <div className={styles.tutor}>
            <InitialIcon 
                first={names[0].charAt(0)} 
                last={names[names.length-1].charAt(0)} 
                type={type}
                newAttendee={newAttendee}
            />
            <div className={styles.details}>
                {newAttendee 
                    ? <Input
                        placeholder={`Add ${type === Attendee.Student ? 'Student' : 'Tutor'}`} 
                        variant="borderless"
                    />
                    : <p>{name}</p>
                }
                {attendanceRateDisplay()}
            </div>
        </div>
    )
}