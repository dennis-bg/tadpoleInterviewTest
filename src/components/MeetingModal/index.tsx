import React from "react";
import { MyModal } from "../common/MyModal";
import { MeetingDetails } from "../../types/types";
import styles from './styles.module.css'
import { MeetingInfoCard } from "../MeetingInfo";
import { MeetingParticipants } from "../MeetingParticipants";
interface MeetingModalProps {
    open: boolean,
    meetingDetails: MeetingDetails
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ open, meetingDetails }) => {
    return (
        <MyModal>
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
                <MeetingParticipants/>
            </div>
        </MyModal>
    )
}