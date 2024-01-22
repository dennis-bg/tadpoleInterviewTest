interface MeetingInfo {
    title: string,
    subject: string,
    date: string,
    startTime: string,
    endTime: string,
    endDate: string,
    repitition: string,
    location: string
}

interface Student {
    name: string,
    attendance: boolean
}

interface Attendeees {
    tutors: string[],
    students: Student[]
}

export interface MeetingDetails {
    info: MeetingInfo,
    people: Attendeees
}