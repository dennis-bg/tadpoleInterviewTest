import React, { useState } from "react";
import { MyModal } from "../common/MyModal";
import { IAttendee, MeetingDetails, Student } from "../../types/types";
import styles from './styles.module.css'
import { MeetingInfoCard } from "../MeetingInfo";
import { MeetingParticipants } from "../MeetingParticipants";
import { EditModeContext } from "../../store/edit-mode-context";
import { StagedEditsContext } from "../../store/staged-edits-context";

interface MeetingModalProps {
    open: boolean,
    meetingDetails: MeetingDetails
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ open, meetingDetails }) => {

    const [editMode, setEditMode] = useState<boolean>(true);
    const [info, setInfo] = useState(meetingDetails.info)
    const [students, setStudents] = useState<Student[]>(meetingDetails.participants.students);
    const [tutors, setTutors] = useState<IAttendee[]>(meetingDetails.participants.tutors);

    const [stagedTitle, setStagedTitle] = useState<string>(meetingDetails.info.title);
    const [stagedSubject, setStagedSubject] = useState<string>(meetingDetails.info.subject);
    const [stagedDate, setStagedDate] = useState<string>(meetingDetails.info.date);
    const [stagedStartTime, setStagedStartTime] = useState<string>(meetingDetails.info.startTime);
    const [stagedEndTime, setStagedEndTime] = useState<string>(meetingDetails.info.endTime);
    const [stagedEndDate, setStagedEndDate] = useState<string>(meetingDetails.info.endDate);
    const [stagedLocation, setStagedLocation] = useState<string>(meetingDetails.info.location);

    const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setStagedTitle(e.target.value);
    }

    const handleSubjectChange = (subject: string) => {
        setStagedSubject(subject);
    }

    const handleStagedDateChange = (date: string) => {
        setStagedDate(date);
    };
      
    const handleStagedStartTimeChange = (startTime: string) => {
        setStagedStartTime(startTime);
    };
      
    const handleStagedEndTimeChange = (endTime: string) => {
        setStagedEndTime(endTime);
    };
      
    const handleStagedEndDateChange = (endDate: string) => {
        setStagedEndDate(endDate);
    };
      
    const handleStagedLocationChange = (location: string) => {
        setStagedLocation(location);
    };
      

    const stagedCtxValue = {
        data: {
            stagedDate,
            stagedStartTime,
            stagedEndTime,
            stagedEndDate,
            stagedLocation
        },
        handlers: {
            handleStagedDateChange,
            handleStagedStartTimeChange,
            handleStagedEndTimeChange,
            handleStagedEndDateChange,
            handleStagedLocationChange
        }
    }

    const editCtxValue = {
        editMode,
        toggleEditMode: () => setEditMode(!editMode)
    }

    return (
        <MyModal>
            <EditModeContext.Provider value={editCtxValue}>
                <div className={styles.meetingDetails}>
                    <StagedEditsContext.Provider value={stagedCtxValue}>
                        <MeetingInfoCard
                            title={stagedTitle} 
                            handleTitleChange={handleTitleChange}
                            subject={stagedSubject}
                            handleSubjectChange={handleSubjectChange}
                            info={info}
                            duration={"40 minutes"}
                            students={meetingDetails.participants.students.length}
                            tutors={meetingDetails.participants.tutors.length}
                        />
                    </StagedEditsContext.Provider>
                    <MeetingParticipants 
                        students={students} 
                        tutors={tutors}
                    />
                </div>
            </EditModeContext.Provider>
        </MyModal>
    )
}