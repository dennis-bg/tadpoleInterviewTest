import { createContext } from "react";

export const StagedEditsContext = createContext({
    data:{
        stagedDate: '',
        stagedStartTime: '',
        stagedEndTime: '',
        stagedEndDate: '',
        stagedLocation: '',
    },
    handlers: {
        handleStagedDateChange: (date: string) => {},
        handleStagedStartTimeChange: (startTime: string) => {},
        handleStagedEndTimeChange: (endTime: string) => {},
        handleStagedEndDateChange: (endDate: string) => {},
        handleStagedLocationChange: (location: string) => {},
    }
})