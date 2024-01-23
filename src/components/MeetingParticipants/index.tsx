import React, { useState } from "react";
import styles from './styles.module.css'
import { Attendeees } from "../../types/types";
import { Switch } from "antd";
import { AttendeeItem, Attendee } from "./Attendee";

enum View {
    Attendance,
    Pricing
}

export const MeetingParticipants: React.FC<Attendeees> = ({
    students,
    tutors
}) => {

    const [view, setView] = useState<View>(View.Attendance)

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
                    className={styles.switch}
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
                            />
                        </li>
                    )}
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
                            />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}