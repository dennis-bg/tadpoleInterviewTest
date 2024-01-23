import React, { useState } from "react";
import { Attendee, AttendeeItem } from "../Attendee";

interface NewAttendeeProps {
    type: Attendee;
    addAttendee: (attendee: string) => void ;
}

export const NewAttendee: React.FC<NewAttendeeProps> = ({ type, addAttendee }) => {

    const [newName, setNewName] = useState<string>('');
    
    const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewName(e.target.value)
    }

    const handleSaveAttendee = () => {
        addAttendee(newName);
        setNewName('');
    }

    return (
        <li>
            <AttendeeItem
                name={''}
                rate={0}
                showRate={false}
                type={type}
                newAttendee={true}
                newName={newName}
                handleNameChange={handleNameChange}
                handleSaveAttendee={handleSaveAttendee}
            />
        </li>
    )
}