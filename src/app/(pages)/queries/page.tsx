'use client'
import { database } from "@/app/firebase"
import { ref, onValue, get, query, orderByChild, startAt, endAt, onChildAdded, update, onChildRemoved, onChildChanged, onChildMoved } from "firebase/database"
import { useState, useEffect, useRef } from "react"
import "./style.css"
import { redirect } from "next/dist/server/api-utils"

export default function Page() {
    const [messageList, setMessageList] = useState([])
    const currentPage = useRef(0)
    const allMessageRef = ref(database, 'u01/messages')
    const allMessageRef2 = ref(database, 'u01')
    const sortedMessageRef = query(ref(database, 'u01/messages'), orderByChild('views'))
    const sortedMessageChildRef = query(ref(database, 'u01/messages/m05'), orderByChild('views'))
    const pinnedMessageRef = query(ref(database, 'u01/messages'), orderByChild('pinned'), startAt(true))
    const unpinnedMessageRef = query(ref(database, 'u01/messages'), orderByChild('pinned'), endAt(false))
    const isListening = useRef(false)
    const count = useRef(0)

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
                res.forEach(child => {
                    snapshotArray.push(child.val())
                })
                // console.log(snapshotArray)
                setMessageList(snapshotArray)
            })
        })
        if(!isListening.current) {
            // onChildAdded(allMessageRef, snapshot => {
            //     console.log(count.current++, snapshot.val())
            // })

            // onChildRemoved(allMessageRef, snapshot => {
            //     console.log(snapshot.val())
            // })

            // onChildChanged(allMessageRef, snapshot => {
            //     console.log(snapshot.val())
            // })

            // onChildChanged(allMessageRef2, snapshot => {
            //     console.log(snapshot.val())
            // })

            onChildMoved(sortedMessageRef, (snapshot, previousChildName) => {
                console.log(snapshot.val())
                console.log(previousChildName)
            })

            //Not work, need to watch on the parent node like above
            // onChildMoved(sortedMessageChildRef, snapshot => {
            //     console.log(snapshot.val())
            // })
            isListening.current = true
        }
    }, [])

    const addValue = () => {
        const updates = {}
        updates['/u01/messages/m80'] = {
            id: 'm80',
            text: 'lkfjwoeingwo',
            pinned: false,
            views: 36
        }
        updates['/u01/messages/m81'] = {
            id: 'm81',
            text: 'erherh',
            pinned: false,
            views: 332
        }
        updates['/u01/messages/m82'] = {
            id: 'm82',
            text: 'hhhhhh',
            pinned: true,
            views: 177
        }
        update(ref(database), updates)
    }

    const removeData = () => {
        const updates = {}
        updates['/u01/messages/m80'] = null
        updates['/u01/messages/m81'] = null
        updates['/u01/messages/m82'] = null
        update(ref(database), updates)
    }

    const changeData = () => {
        const updates = {}
        updates['/u01/messages/m80'] = {
            id: 'm80',
            text: 'lkfjwoeingwo',
            pinned: false,
            views: 361
        }
        updates['/u01/messages/m81'] = {
            id: 'm81',
            text: 'erherh',
            pinned: false,
            views: 3321
        }
        updates['/u01/messages/m82'] = {
            id: 'm82',
            text: 'hhhhhh',
            pinned: true,
            views: 1771
        }
        update(ref(database), updates)
    }

    return <>
        <h1>Queries page</h1>
        <button onClick={addValue}>Insert data</button>
        <button onClick={removeData}>Remove data</button>
        <button onClick={changeData}>Change data</button>
        {
            messageList.map(item => <div key={item.id} className={`message-card ${item.pinned ? "pinned" : ""}`}>
                <h3>{item.id}</h3>
                <p>{item.text}</p>
                <p>{item.views}</p>
            </div>)
        }
    </>
}