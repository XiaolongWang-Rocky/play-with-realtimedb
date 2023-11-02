'use client'
import React, {useState, useEffect, useRef} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { database } from '@/app/firebase'
import { ref, onValue, query, limitToLast, endBefore, get, orderByChild } from 'firebase/database'

const Page = () => {
    const [items, setItems] = useState([])
    const messageRef = ref(database, 'u01/messages')
    const pageSize = 5
    const pageIndex = useRef('')
    const dataSize = useRef(0)

    const fetchMoreData = async () => {
        pageIndex.current = items[items.length-1]?.id
        let messageQuery
        if(pageIndex.current) {
            messageQuery = query(messageRef, limitToLast(pageSize), orderByChild('id'), endBefore(pageIndex.current))
        } else {
            messageQuery = query(messageRef, limitToLast(pageSize), orderByChild('id'))
        }
        const messagesRes = await get(messageQuery)
        const messageArray = []
        messagesRes.forEach(child => {
            messageArray.unshift(child.val())
        })
        setItems(prevState => [...prevState, ...messageArray])
    }

    useEffect(()=>{
        dataSize.current = items.length
    }, [items])

    useEffect(()=>{
        onValue(messageRef, ()=>{
            console.log(dataSize.current)
            let messageQuery
            if(dataSize.current) {
                messageQuery = query(messageRef, orderByChild('id'), limitToLast(dataSize.current))
            } else {
                messageQuery = query(messageRef, orderByChild('id'), limitToLast(pageSize))
            }
            get(messageQuery)
            .then(res => {
                const messageArray = []
                res.forEach(child => {
                    messageArray.unshift(child.val())
                })
                setItems(messageArray)
            })
        })
    }, [])

    console.log(items)
    return <>
        <h1>Infinite Scroll</h1>
        <div
            id="scrollableDiv"
            style={{
                height: '100vh',
                width: '600px',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
            >
            {/*Put the scroll bar always on the bottom*/}
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                {items.map((item, index) => (
                <div style={{width: '100%', height: '400px', backgroundColor: 'lightcoral', margin: '3px'}} key={index}>
                    <h1>{item.id}</h1>
                    <p>{item.text}</p>
                </div>
                ))}
            </InfiniteScroll>
        </div>
    </>
}

export default Page