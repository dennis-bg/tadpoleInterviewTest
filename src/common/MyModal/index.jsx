import React from "react";
import styles from './styles.module.css'

export const MyModal = ({children}) => {
    return (
        <div className={styles.mask}>
            <div className={styles.modal}>
                <div className={styles.header}></div>
                {children}
            </div>
        </div>
    )
}