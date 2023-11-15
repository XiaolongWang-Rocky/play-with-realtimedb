'use client'
import { database } from "@/app/firebase"
import { FirebaseApp } from "firebase/app"
import { ref, onDisconnect, onValue, query, limitToLast, get, update, off } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import './style.css'

export default function Page() {
    const statusRef = ref(database, 'u01/status')
    const statusListener = useRef(null)
    // const msgRef = query(ref(database, 'u01/messages'), limitToLast(4))

    useEffect(()=>{
        console.log('add listener')
        onValue(statusRef, (snapshot)=>{
            console.log(snapshot.val())
            update(statusRef, {online: true})
        })
        onDisconnect(statusRef).update({online: false})
        return () => {
            off(statusRef, 'value')
            update(statusRef, {online: false})
        }
    }, [])

    const handleConnect = () => {
        onValue(statusRef, (snapshot)=>{
            console.log(snapshot.val())
            update(statusRef, {online: true})
        })
    }

    return <>
        <h1>user status page</h1>
        {/* <button onClick={handleDisconnect}>Disconnect DB</button> */}
        <button onClick={handleConnect}>Connect DB</button>
    </>
}