import React from "react";
import { MyModal } from "../common/MyModal";


interface MeetingModalProps {
    open: boolean;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ open }) => {
    return (
        <MyModal>
            <p>test</p>
        </MyModal>
    )
}