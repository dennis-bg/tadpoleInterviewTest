import React, { useContext } from "react";
import styles from './styles.module.css'
import { DatePicker, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { StagedEditsContext } from "../../../store/staged-edits-context";

export const EditDetails = () => {

    const {data, handlers} = useContext(StagedEditsContext);

    const handleTimeChange = (value: any) => {
        handlers.handleStagedStartTimeChange(dayjs(value[0]))
        handlers.handleStagedEndTimeChange(dayjs(value[1]))
    };

    const handleDateChange = (date: any) => {
        handlers.handleStagedDateChange(date)
    }

    const handleEndDateChange = (date: any) => {
        handlers.handleStagedEndDateChange(date)
    }

    const handleLocationChange = (e: { target: { value: string; }; }) => {
        handlers.handleStagedLocationChange(e.target.value)
    }

    return (
        <div className={styles.body}>
            <div className={styles.dateDetails}>
                <div className={styles.group}>
                    <p>Date</p>
                    <DatePicker variant="borderless" value={dayjs(data.stagedDate)} onChange={handleDateChange} format="ddd, MMM Do"/>
                </div>
                <div className={styles.group}>
                    <p>Time</p>
                    <TimePicker.RangePicker variant="borderless" 
                        value={[dayjs(data.stagedStartTime), dayjs(data.stagedEndTime)]} 
                        onChange={handleTimeChange} format="h:mm a"/>
                </div>
                <div className={styles.group}>
                    <p>Repeats</p>
                    <Select 
                        variant="borderless"
                        onChange={handlers.handleStagedRepitionChange}
                        defaultValue={'every 7 days'}
                        value={data.stagedRepetition}
                        options={[
                            { value: 'every 7 days', label: 'every 7 days' },
                            { value: 'Mon, Wed, Fri', label: 'Mon, Wed, Fri' },
                            { value: 'Tue, Thu', label: 'Tue, Thu' },
                            { value: 'Sat, Sun', label: 'Sat, Sun' },
                          ]}
                    />
                </div>
                <div className={styles.group}>
                    <p>Ends on or Before</p>
                    <DatePicker variant="borderless"value={dayjs(data.stagedEndDate)} onChange={handleEndDateChange} format="ddd, MMM Do"/>
                </div>
            </div>
            <div className={styles.group}>
                <p>Location</p>
                <Input value={data.stagedLocation} onChange={handleLocationChange}/>
            </div>
        </div>
    )
}