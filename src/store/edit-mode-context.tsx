import { createContext } from "react";
import { Attendee } from "../components/MeetingParticipants/Attendee";

export const EditModeContext = createContext({
    editMode: false,
    toggleEditMode: () => {},
    editRate: (attendee: string, rate: number, type: Attendee) => {}
})