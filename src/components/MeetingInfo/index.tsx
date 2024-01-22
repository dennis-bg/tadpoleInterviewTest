import React from "react";
import styles from './styles.module.css'
import { MeetingInfo } from "../../types/types";
import { LocationSVG } from "../../svgs/location";
import { QuoteSVG } from "../../svgs/quote";
import { ClockSVG } from "../../svgs/clock";
import { GradHatSVG } from "../../svgs/gradHat";
import { UserSVG } from "../../svgs/user";

interface InfoCalculations {
    duration: string,
    students: number,
    tutors: number
}

type MeetingInfoProps = MeetingInfo & InfoCalculations;

export const MeetingInfoCard:React.FC<MeetingInfoProps> = ({
    title,
    subject,
    date,
    startTime,
    endTime,
    endDate,
    repitition,
    location,
    duration,
    students,
    tutors
}) => {
    return (
        <div className={styles.info}>
            <div className={styles.infoRow}>
                <QuoteSVG/>
                <div className={styles.content}>
                    <div className={styles.titleSubject}>
                        <h1 className={styles.title}>{title}</h1>
                        <div>
                            <div className={styles.subject}>{subject}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.infoRow}>
                <LocationSVG/>
                <div className={styles.content}>
                    <p className={styles.basicInfo}>{location}</p>
                </div>
            </div>
            <div className={styles.infoRow}>
                <ClockSVG/>
                <div className={styles.content}>
                    <p className={styles.basicInfo}>{duration}</p>
                </div>
            </div>
            <div className={styles.infoRow}>
                <GradHatSVG/>
                <div className={styles.content}>
                    <p className={styles.basicInfo}>{students} Students</p>
                </div>
            </div>
            <div className={styles.infoRow}>
                <UserSVG/>
                <div className={styles.content}>
                    <p className={styles.basicInfo}>{tutors} Tutors</p>
                </div>
            </div>
        </div>
    )
}