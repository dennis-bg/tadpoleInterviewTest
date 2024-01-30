
interface AttendanceProps {
    attended: boolean
}

export const AttendenceSVG: React.FC<AttendanceProps> = ({attended}) => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5" cy="12.6914" r="12" fill={attended ? "#31E190" : "#F9F9F9"} stroke={attended ? '' : '#31E190'}/>
        <line x1="6.30907" y1="13.7373" x2="10.7709" y2="17.9682" stroke={attended ? "#F9F9F9" : "#31E190"} strokeWidth="2.04255"/>
        <line x1="9.47991" y1="17.8413" x2="19.182" y2="8.1392" stroke={attended ? "#F9F9F9" : "#31E190"} strokeWidth="2.04255"/>
        </svg>
    )
}
