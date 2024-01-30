import { createContext } from "react";
import { Attendee } from "../components/MeetingParticipants/Attendee";
import { Student } from "../types/types";

export const EditModeContext = createContext({
    editMode: false,
    toggleEditMode: () => {},
    editRate: (attendee: string, rate: number, type: Attendee) => {},
    toggleAttendance: (student: string) => {}
})