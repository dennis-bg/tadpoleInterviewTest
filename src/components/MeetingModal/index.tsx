import React, { useState } from "react";
import { MyModal } from "../common/MyModal";
import { IAttendee, MeetingDetails, Sequence, Student } from "../../types/types";
import styles from './styles.module.css'
import { MeetingInfoCard } from "../MeetingInfo";
import { MeetingParticipants } from "../MeetingParticipants";
import { EditModeContext } from "../../store/edit-mode-context";
import { StagedEditsContext } from "../../store/staged-edits-context";
import dayjs, { Dayjs } from "dayjs";
import { Attendee } from "../MeetingParticipants/Attendee";

interface MeetingModalProps {
    open: boolean,
    meetingDetails: MeetingDetails
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ open, meetingDetails }) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [info, setInfo] = useState(meetingDetails.info)
    const [students, setStudents] = useState<Student[]>(meetingDetails.participants.students);
    const [tutors, setTutors] = useState<IAttendee[]>(meetingDetails.participants.tutors);

    const [stagedStudents, setStagedStudents] = useState<Student[]>(students);
    const [stagedTutors, setStagedTutors] = useState<IAttendee[]>(tutors);

    const [stagedTitle, setStagedTitle] = useState<string>(meetingDetails.info.title);
    const [stagedSubject, setStagedSubject] = useState<string>(meetingDetails.info.subject);
    const [stagedDate, setStagedDate] = useState<string>(meetingDetails.info.date);
    const [stagedStartTime, setStagedStartTime] = useState<Dayjs>(dayjs(meetingDetails.info.startTime));
    const [stagedEndTime, setStagedEndTime] = useState<Dayjs>(dayjs(meetingDetails.info.endTime));
    const [stagedEndDate, setStagedEndDate] = useState<string>(meetingDetails.info.endDate);
    const [stagedLocation, setStagedLocation] = useState<string>(meetingDetails.info.location);
    const [stagedSequence, setStagedSequence] = useState<Sequence>(meetingDetails.info.sequence);
    const [stagedRepetition, setStagedRepitition] = useState<string>(meetingDetails.info.repitition);

    const addStudent = (student: string) => {
        const newStudent = {
            name: student,
            attendance: false,
            rate: 0
        }
        setStagedStudents([...stagedStudents, newStudent]);
    }

    const editRate = (attendee: string, rate: number, type: Attendee) => {
        const oldItem = type === Attendee.Student ? students.find(student => student.name === attendee) : tutors.find(tutor => tutor.name === attendee);
        const newItem = {
            ...oldItem,
            name: attendee,
            rate: rate
        }
        if(type === Attendee.Student){
            const newArray = stagedStudents.map(student => student.name === attendee ? newItem as Student : student)
            setStagedStudents(newArray);
        } else {
            const newArray = stagedTutors.map(tutor => tutor.name === attendee ? newItem : tutor)
            setStagedTutors(newArray);
        }
    }

    const toggleAttendance = (student: string) => {
        const oldItem = stagedStudents.find(s => s.name === student);
        const newItem = {
            ...oldItem,
            attendance: !oldItem?.attendance
        }
        const newArray = stagedStudents.map(s => s.name === student ? newItem as Student : s);
        setStagedStudents(newArray);
    }

    const removeStudent = (studentName: string) => {
        setStagedStudents(stagedStudents.filter(student => student.name !== studentName))
    }

    const addTutor = (tutor: string) => {
        const newTutor = {
            name: tutor,
            rate: 0
        }
        setStagedTutors([...stagedTutors, newTutor])
    }

    const removeTutor = (tutorName: string) => {
        setStagedTutors(stagedTutors.filter(tutor => tutor.name !== tutorName))
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setStagedTitle(e.target.value);
    }

    const handleSubjectChange = (subject: string) => {
        setStagedSubject(subject);
    }

    const handleStagedDateChange = (date: string) => {
        const dictionary = {
            Sun: 'S',
            Mon: 'M',
            Tue: 'T',
            Wed: 'W',
            Thu: 'Th',
            Fri: 'F',
            Sat: 'Sa'
        }

        const newSequence = {
            S: false,
            M: false,
            T: false,
            W: false,
            Th: false,
            F: false,
            Sa: false,
        }

        if(stagedRepetition === 'every 7 days'){
            const day = dayjs(date).format('ddd');
            const index = dictionary[day as keyof typeof dictionary];
            newSequence[index as keyof typeof newSequence] = true;
            setStagedSequence(newSequence);
        }
        setStagedDate(date);
    };
      
    const handleStagedStartTimeChange = (startTime: Dayjs) => {
        setStagedStartTime(startTime);
    };
      
    const handleStagedEndTimeChange = (endTime: Dayjs) => {
        setStagedEndTime(endTime);
    };
      
    const handleStagedEndDateChange = (endDate: string) => {
        setStagedEndDate(endDate);
    };
      
    const handleStagedLocationChange = (location: string) => {
        setStagedLocation(location);
    };

    const handleStagedRepitionChange = (repetition: string) => {

        const dictionary = {
            Sun: 'S',
            Mon: 'M',
            Tue: 'T',
            Wed: 'W',
            Thu: 'Th',
            Fri: 'F',
            Sat: 'Sa'
        }

        const newSequence = {
            S: false,
            M: false,
            T: false,
            W: false,
            Th: false,
            F: false,
            Sa: false,
        }

        if(repetition === 'every 7 days'){
            const day = dayjs(stagedDate).format('ddd');
            const index = dictionary[day as keyof typeof dictionary];
            newSequence[index as keyof typeof newSequence] = true;
        } else {
            const days = repetition.split(', ');
            days.forEach(day => {
                const index = dictionary[day as keyof typeof dictionary];
                newSequence[index as keyof typeof newSequence] = true;
            })
        }
        
        setStagedSequence(newSequence)
        setStagedRepitition(repetition)
    }

    
    const saveChanges = () => {
        setInfo({
            title: stagedTitle,
            subject: stagedSubject,
            date: stagedDate,
            startTime: stagedStartTime,
            endTime: stagedEndTime,
            endDate: stagedEndDate,
            repitition: stagedRepetition,
            location: stagedLocation,
            sequence: stagedSequence
        })
        setStudents(stagedStudents);
        setTutors(stagedTutors);
        toggleEditMode();
    }

    const cancelChanges = () => {
        setStagedTitle(info.title);
        setStagedSubject(info.subject);
        setStagedDate(info.date);
        setStagedStartTime(info.startTime);
        setStagedEndTime(info.endTime);
        setStagedEndDate(info.endDate);
        setStagedLocation(info.location);
        setStagedSequence(info.sequence);
        setStagedRepitition(info.repitition);
        setStagedStudents(students);
        setStagedTutors(tutors);
        toggleEditMode();
    }
      

    const stagedCtxValue = {
        data: {
            stagedDate,
            stagedStartTime,
            stagedEndTime,
            stagedEndDate,
            stagedLocation,
            stagedRepetition
        },
        handlers: {
            handleStagedDateChange,
            handleStagedStartTimeChange,
            handleStagedEndTimeChange,
            handleStagedEndDateChange,
            handleStagedLocationChange,
            handleStagedRepitionChange
        }
    }

    const editCtxValue = {
        editMode,
        toggleEditMode,
        editRate,
        toggleAttendance
    }

    const hours = dayjs(stagedEndTime).diff(dayjs(stagedStartTime), 'hour');
    const minutes = dayjs(stagedEndTime).diff(dayjs(stagedStartTime), 'minute') % 60;
    const duration = `${hours > 0 ? `${hours} hours ` : ''}${minutes > 0 ? `${minutes} minutes` : ''}`;

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
                            toggleEditMode={toggleEditMode}
                            saveChanges={saveChanges}
                            cancelChanges={cancelChanges}
                            duration={duration}
                            students={students.length}
                            tutors={tutors.length}
                            sequence={stagedSequence}
                            repetition={stagedRepetition}
                        />
                    </StagedEditsContext.Provider>
                    <MeetingParticipants 
                        students={stagedStudents} 
                        tutors={stagedTutors}
                        addStudent={addStudent}
                        removeStudent={removeStudent}
                        addTutor={addTutor}
                        removeTutor={removeTutor}
                    />
                </div>
            </EditModeContext.Provider>
        </MyModal>
    )
}