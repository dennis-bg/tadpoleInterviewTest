import React, { useContext } from "react";
import styles from './styles.module.css'
import { MeetingInfo } from "../../types/types";
import { LocationSVG } from "../../svgs/location";
import { QuoteSVG } from "../../svgs/quote";
import { ClockSVG } from "../../svgs/clock";
import { GradHatSVG } from "../../svgs/gradHat";
import { UserSVG } from "../../svgs/user";
import { CalendarSVG } from "../../svgs/calendar";
import { SequenceDisplay } from "./SequenceDisplay";
import { EditModeContext } from "../../store/edit-mode-context";
import { Input, Select } from "antd";
import subjects from '../../fixtures/subjects.json'
import { EditDetails } from "./EditDetails";
import dayjs from 'dayjs';

interface MeetingInfoProps {
    info: MeetingInfo,
    title: string,
    handleTitleChange: (e: { target: { value: React.SetStateAction<string>; }; }) => void,
    subject: string,
    handleSubjectChange: (subject: string) => void,
    duration: string,
    students: number,
    tutors: number
}

export const MeetingInfoCard:React.FC<MeetingInfoProps> = ({
    info,
    title, 
    handleTitleChange,
    subject,
    handleSubjectChange,
    duration,
    students,
    tutors
}) => {

    const { editMode } = useContext(EditModeContext);

    return (
        <div className={styles.info}>
            <div className={styles.infoRow}>
                <QuoteSVG/>
                <div className={styles.content}>
                    <div className={styles.titleSubject}>
                        {editMode 
                            ? <Input size="large" variant="borderless" value={title} onChange={handleTitleChange}/>
                            : <h1 className={styles.title}>{info.title}</h1>
                        }
                        <div>
                            {editMode
                                ?  <Select
                                    value={subject}
                                    onChange={handleSubjectChange}
                                    options={subjects}
                                />
                                : <div className={styles.subject}>{info.subject}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {editMode
                ? <EditDetails/>
                : <>
                    <div className={styles.infoRow}>
                        <CalendarSVG/>
                        <div className={styles.content}>
                            <div className={styles.vertical}>
                                <h4 className={styles.date}>{`${dayjs(info.date).format('MMMM Do')}, ${dayjs(info.startTime).format('h:mm a')} to ${dayjs(info.endTime).format('h:mm a')}`}</h4>
                                <p className={styles.basicInfo}>{`repeats ${info.repitition} until ${dayjs(info.endDate).format('MM/DD')}`}</p>
                            </div>
                            <div className={styles.vertical}>
                                <h4 style={{fontSize: "12px", marginTop: '15px', marginBottom: "10px"}}>This sequence is on :</h4>
                                <SequenceDisplay/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoRow}>
                        <LocationSVG/>
                        <div className={styles.content}>
                            <p className={styles.basicInfo}>{info.location}</p>
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
                </>
            }
        </div>
    )
}