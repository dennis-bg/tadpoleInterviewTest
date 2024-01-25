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
import { Button, Input, Select } from "antd";
import subjects from '../../fixtures/subjects.json'
import { EditDetails } from "./EditDetails";
import dayjs from 'dayjs';
import { StagedEditsContext } from "../../store/staged-edits-context";

interface MeetingInfoProps {
    title: string,
    handleTitleChange: (e: { target: { value: React.SetStateAction<string>; }; }) => void,
    toggleEditMode: () => void,
    saveChanges: () => void,
    cancelChanges: () => void,
    subject: string,
    handleSubjectChange: (subject: string) => void,
    duration: string,
    students: number,
    tutors: number
}

export const MeetingInfoCard:React.FC<MeetingInfoProps> = ({
    title, 
    handleTitleChange,
    toggleEditMode,
    saveChanges,
    cancelChanges,
    subject,
    handleSubjectChange,
    duration,
    students,
    tutors
}) => {

    const { editMode } = useContext(EditModeContext);
    const { data } = useContext(StagedEditsContext);

    return (
        <div className={styles.info}>
            <div>
                <div className={styles.infoRow}>
                    <QuoteSVG/>
                    <div className={styles.content}>
                        <div className={styles.titleSubject}>
                            {editMode 
                                ? <Input size="large" variant="borderless" value={title} onChange={handleTitleChange}/>
                                : <h1 className={styles.title}>{title}</h1>
                            }
                            <div>
                                {editMode
                                    ?  <Select
                                        value={subject}
                                        onChange={handleSubjectChange}
                                        options={subjects}
                                    />
                                    : <div className={styles.subject}>{subject}</div>
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
                                    <h4 className={styles.date}>{`${dayjs(data.stagedDate).format('MMMM Do')}, ${dayjs(data.stagedStartTime).format('h:mm a')} to ${dayjs(data.stagedEndTime).format('h:mm a')}`}</h4>
                                    <p className={styles.basicInfo}>{`repeats ${'every 7 days'} until ${dayjs(data.stagedEndDate).format('MM/DD')}`}</p>
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
                                <p className={styles.basicInfo}>{data.stagedLocation}</p>
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
            <div className={styles.buttons}>
                <Button 
                    type="primary" 
                    onClick={editMode ? saveChanges : toggleEditMode}
                >
                    {editMode ? 'Save' : 'Edit'}
                </Button>
                <Button
                    onClick={editMode ? cancelChanges : () => {}}
                >
                    {editMode ? 'Discard Changes' : 'Cancel Meeting'}
                </Button>
            </div>
        </div>
    )
}