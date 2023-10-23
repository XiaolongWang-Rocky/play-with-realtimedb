'use client'
import { database } from "@/app/firebase"
import { ref, onValue, get, query, orderByChild, startAt, endAt } from "firebase/database"
import { useState, useEffect, useRef } from "react"
import "./style.css"

export default function Page() {
    const [messageList, setMessageList] = useState([])
    const currentPage = useRef(0)
    const allMessageRef = ref(database, 'u01/messages')
    const sortedMessageRef = query(ref(database, 'u01/messages'), orderByChild('views'))
    const pinnedMessageRef = query(ref(database, 'u01/messages'), orderByChild('pinned'), startAt(true))
    const unpinnedMessageRef = query(ref(database, 'u01/messages'), orderByChild('pinned'), endAt(false))

    useEffect(()=>{
        // onValue(allMessageRef, ()=>{
        //     const snapshotArray = []
        //     get(unpinnedMessageRef)
        //     .then(unpinnedRes => {
        //         const unpinnedResObj = unpinnedRes.val()
        //         for(let key in unpinnedResObj) {
        //             snapshotArray.unshift(unpinnedResObj[key])
        //         }
        //         // console.log(snapshotArray)
        //         return get(pinnedMessageRef)
        //     })
        //     .then(pinnedRes=>{
        //         const pinnedResObj = pinnedRes.val()
        //         // console.log(resObj)
        //         for(let key in pinnedResObj) {
        //             snapshotArray.unshift(pinnedResObj[key])
        //         }
        //         // console.log(snapshotArray)
        //         setMessageList(snapshotArray)
        //     })
        // })
        onValue(allMessageRef, ()=>{
            const snapshotArray = []
            get(sortedMessageRef)
            .then(res => {
                const resObj = res.val()
                for(let key in resObj) {
                    snapshotArray.unshift(resObj[key])
                }
                console.log(snapshotArray)
                setMessageList(snapshotArray)
            })
        })
    }, [])

    return <>
        <h1>Queries page</h1>
        {
            messageList.map(item => <div key={item.id} className={`message-card ${item.pinned ? "pinned" : ""}`}>
                <h3>{item.id}</h3>
                <p>{item.text}</p>
                <p>{item.views}</p>
            </div>)
        }
    </>
}