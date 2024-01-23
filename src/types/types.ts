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


export interface IAttendee {
    name: string,
    rate: number
}

export interface Student extends IAttendee{
    attendance: boolean,
}

export interface Attendeees {
    tutors: IAttendee[],
    students: Student[]
}

export interface MeetingDetails {
    info: MeetingInfo,
    participants: Attendeees
}