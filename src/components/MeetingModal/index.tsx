import React, { useState } from "react";
import { MyModal } from "../common/MyModal";
import { IAttendee, MeetingDetails, Student } from "../../types/types";
import styles from './styles.module.css'
import { MeetingInfoCard } from "../MeetingInfo";
import { MeetingParticipants } from "../MeetingParticipants";
import { EditModeContext } from "../../store/edit-mode-context";

interface MeetingModalProps {
    open: boolean,
    meetingDetails: MeetingDetails
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ open, meetingDetails }) => {

    const [editMode, setEditMode] = useState<boolean>(true);
    const [students, setStudents] = useState<Student[]>(meetingDetails.participants.students);
    const [tutors, setTutors] = useState<IAttendee[]>(meetingDetails.participants.tutors);

    const ctxValue = {
        editMode,
        toggleEditMode: () => setEditMode(!editMode)
    }

    return (
        <MyModal>
            <EditModeContext.Provider value={ctxValue}>
                <div className={styles.meetingDetails}>
                    <MeetingInfoCard 
                        title={meetingDetails.info.title}  
                        subject={meetingDetails.info.subject} 
                        date={meetingDetails.info.date} 
                        startTime={meetingDetails.info.startTime} 
                        endTime={meetingDetails.info.endTime} 
                        endDate={meetingDetails.info.endDate} 
                        repitition={meetingDetails.info.repitition} 
                        location={meetingDetails.info.location}
                        duration={"40 minutes"}
                        students={meetingDetails.participants.students.length}
                        tutors={meetingDetails.participants.tutors.length}
                    />
                    <MeetingParticipants 
                        students={students} 
                        tutors={tutors}
                    />
                </div>
            </EditModeContext.Provider>
        </MyModal>
    )
}