'use client'
import { database } from "@/app/firebase"
import { ref, onDisconnect, onValue, query, limitToLast, get } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import './style.css'

export default function Page() {
    const connectedRef = ref(database, '.info/connected')
    const msgRef = query(ref(database, 'u01/messages'), limitToLast(4))
    const [msgList, setMsgList] = useState([])
    const currentPage = useRef(1)

    useEffect(()=>{
        onValue(connectedRef, (snapshot) => {
            const snapshotValue = snapshot.val()
            console.log(snapshotValue)
            if(snapshotValue === true) {
                console.log("connected")
            }
            else {
                console.log("not connected")
            }
        })
    }, [])

    useEffect(()=>{
        // onValue(msgRef, (snapshot) => {
        //     const newMessagesObj = snapshot.val()
        //     const newMessageList = []
        //     for(let key in newMessagesObj) {
        //         newMessageList.unshift(newMessagesObj[key])
        //     }
        //     setMsgList(newMessageList)
        // })
        onValue(msgRef, (snapshot) => {
            get(query(ref(database, 'u01/messages'), limitToLast(currentPage.current * 4)))
            .then(res => {
                const newMessagesObj = res.val()
                console.log(newMessagesObj)
                const newMessageList = []
                for(let key in newMessagesObj) {
                    newMessageList.unshift(newMessagesObj[key])
                }
                setMsgList(newMessageList)
            })
        })
    }, [])

    function loadMore() {
        get(query(ref(database, 'u01/messages'), limitToLast(++currentPage.current * 4)))
        .then(res => {
            const newMessagesObj = res.val()
            console.log(newMessagesObj)
            const newMessageList = []
            for(let key in newMessagesObj) {
                newMessageList.unshift(newMessagesObj[key])
            }
            setMsgList(newMessageList)
        })
    }

    return <>
        <h1>user status page</h1>
        <button>Disconnect DB</button>
        {
            msgList.map(item => <div key={item.id} className="message-card">{item.text}</div>)
        }
        <button onClick={loadMore}>Load more</button>
    </>
}