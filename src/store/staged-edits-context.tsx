import dayjs, { Dayjs } from "dayjs";
import { createContext } from "react";

export const StagedEditsContext = createContext({
    data:{
        stagedDate: '',
        stagedStartTime: dayjs(),
        stagedEndTime: dayjs(),
        stagedEndDate: '',
        stagedLocation: '',
        stagedRepetition: '',
    },
    handlers: {
        handleStagedDateChange: (date: string) => {},
        handleStagedStartTimeChange: (startTime: Dayjs) => {},
        handleStagedEndTimeChange: (endTime: Dayjs) => {},
        handleStagedEndDateChange: (endDate: string) => {},
        handleStagedLocationChange: (location: string) => {},
        handleStagedRepitionChange: (repition: string) => {}
    }
})