import React from "react";
import { MyModal } from "../common/MyModal";
import { MeetingDetails } from "./types";
import styles from './styles.module.css'
import { MeetingInfo } from "../MeetingInfo";
import { MeetingParticipants } from "../MeetingParticipants";
interface MeetingModalProps {
    open: boolean,
    meetingDetails: MeetingDetails
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ open, meetingDetails }) => {
    return (
        <MyModal>
            <div className={styles.meetingDetails}>
                <MeetingInfo/>
                <MeetingParticipants/>
            </div>
        </MyModal>
    )
}