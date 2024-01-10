'use client'
import { database } from "@/app/firebase"
import { ref, onValue, get, query, orderByChild, startAt, endAt, onChildAdded, update, onChildRemoved, onChildChanged, onChildMoved } from "firebase/database"
import { useEffect, useRef } from "react"

export default function Page() {
    const initData = useRef(false)

    useEffect(() => {
        
    }, [])
}