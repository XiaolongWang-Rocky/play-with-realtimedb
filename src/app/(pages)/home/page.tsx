'use client'
import { database } from "@/app/firebase"
import { onValue, ref, update, set } from "firebase/database"
import { useState, useEffect } from "react"
import './style.css';

export default function Page() {
    const [msgList, setMsgList] = useState([])
    const msgRef = ref(database, '1')

    useEffect(()=>{
        onValue(msgRef, (snapshot) => {
            const msgListObj = snapshot.val()
            const newMsgList = []
            for (const key in msgListObj) {
                newMsgList.push(msgListObj[key])
            }
            setMsgList(newMsgList)
            // console.log(newMsgList)
        })
    }, [])

    const handleClick = () => {
        const updates = {}
        for (const message of msgList) {
            if (message.type === "sys") {
                updates[`1/${message.id}`] = {
                    ...message,
                    isRead: "true"
                }
            }
        }
        return update(ref(database), updates)
    }

    const initData = () => {

    }

    return <>
        <h1>Home Page</h1>
        <button onclick={initData}>Initialize data</button>
        <button onClick={handleClick}>Read all system message</button>
        {
            msgList.map((message) => (
                <div className={message.isRead === "false" ? "unread" : ""}>
                    <h3>{message.id}</h3>
                    <p>{message.msg}</p>
                </div>
            ))
        }
    </>
}