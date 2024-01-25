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
    newAttendee: boolean;
    removeAttendee?: (attendee: string) => void;
    newName?: string;
    handleNameChange?: (e: { target: { value: React.SetStateAction<string>; }; }) => void;
    handleSaveAttendee?: () => void;
}

export const AttendeeItem: React.FC<IAttendee & AttendeeProps> = ({ 
    name, 
    rate, 
    showRate,
    type,
    newAttendee,
    removeAttendee,
    newName,
    handleNameChange,
    handleSaveAttendee
}) => {

    const { editMode, toggleEditMode, editRate } = useContext(EditModeContext); 

    const names = name.split(' ');

    const attendanceRateDisplay = () => {
        if(newAttendee){
            return null;
        }
        else{
            if(editMode){
                if(showRate){
                    return <div style={{width: "25%", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span>$</span>
                        <Input
                            value={rate}
                            variant="borderless"
                            size="small"
                            defaultValue={0}
                            style={{borderBottom: "1px solid #31E190", width: '30px'}}
                            onChange={(e) => editRate(name, parseInt(e.target.value), type)}
                        />
                        <span>/hr</span>
                    </div>;
                } else {
                    return <div onClick={() => removeAttendee && removeAttendee(name)}><RemoveSVG/></div>
                }
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

    const handleClick = () => {
        if(!newAttendee) return;
        if(handleSaveAttendee){
            handleSaveAttendee();
        }
    }

    return (
        <div className={styles.tutor}>
            <div onClick={handleClick}>
                <InitialIcon 
                    first={names[0].charAt(0)} 
                    last={names[names.length-1].charAt(0)} 
                    type={type}
                    newAttendee={newAttendee}
                    
                />
            </div>
            <div className={styles.details}>
                {newAttendee 
                    ? <Input
                        value={newName}
                        onChange={handleNameChange}
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