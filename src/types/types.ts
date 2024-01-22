export interface MeetingInfo {
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
    attendance: boolean,
    paying: number
}

interface Tutor {
    name: string,
    rate: number
}

interface Attendeees {
    tutors: Tutor[],
    students: Student[]
}

export interface MeetingDetails {
    info: MeetingInfo,
    participants: Attendeees
}