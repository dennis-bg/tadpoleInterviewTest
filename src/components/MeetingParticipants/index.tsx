import React, { useState, useContext } from "react";
import styles from './styles.module.css'
import { Attendeees, IAttendee, Student } from "../../types/types";
import { Switch } from "antd";
import { AttendeeItem, Attendee } from "./Attendee";
import { EditModeContext } from "../../store/edit-mode-context";
import { NewAttendee } from "./NewAttendee";

enum View {
    Attendance,
    Pricing
}

interface MeetingParticipantsProps {
    students: Student[];
    tutors: IAttendee[];
    addStudent: (student: string) => void;
    removeStudent: (student: string) => void;
    addTutor: (tutor: string) => void;
    removeTutor: (tutor: string) => void;
}

export const MeetingParticipants: React.FC<MeetingParticipantsProps> = ({
    students,
    tutors,
    addStudent,
    removeStudent,
    addTutor,
    removeTutor
}) => {
    
    const { editMode } = useContext(EditModeContext);

    const [view, setView] = useState<View>(View.Attendance);

    const handleSwitchChange = (checked: boolean) => {
        if(checked){
            setView(View.Pricing);
        }else{
            setView(View.Attendance);
        }
    }

    return (
        <div className={styles.participants}>
            <h1>People</h1>
            <div className={styles.switchSection}>
                <p>Attendance</p>
                <Switch 
                    checked={view !== View.Attendance}
                    onChange={handleSwitchChange}
                    size={"small"}
                />
                <p>Pricing</p>
            </div>
            <div className={styles.body}>
                <div className={styles.subTitle}>
                    <h2>Tutors</h2>
                    {view === View.Pricing && <p>Recieving</p>}
                </div>
                <ul>
                    {tutors.map(tutor => 
                        <li key={tutor.name}>
                            <AttendeeItem
                                name={tutor.name}
                                rate={tutor.rate}
                                showRate={view === View.Pricing}
                                type={Attendee.Tutor}
                                newAttendee={false}
                                removeAttendee={removeTutor} 
                                attendance={false}                            />
                        </li>
                    )}
                    {editMode && view === View.Attendance &&
                        <NewAttendee type={Attendee.Tutor} addAttendee={addTutor}/>
                    }
                </ul>
                <div className={styles.subTitle}>
                    <h2>Students</h2>
                    <p>{view === View.Attendance ? 'Attendance' : 'Paying'}</p>
                </div>
                <ul>
                    {students.map(student => 
                        <li key={student.name}>
                            <AttendeeItem
                                name={student.name}
                                rate={student.rate}
                                showRate={view === View.Pricing}
                                type={Attendee.Student}
                                newAttendee={false}
                                removeAttendee={removeStudent}
                                attendance={student.attendance}
                            />
                        </li>
                    )}
                    {editMode && view === View.Attendance &&
                        <NewAttendee type={Attendee.Student} addAttendee={addStudent}/>
                    }
                </ul>
            </div>
        </div>
    )
}