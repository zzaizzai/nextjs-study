'use client'

import { useEffect, useState } from "react"


export default function Comment(props) {


    let [comment, setComment] = useState('')
    let [data, setData] = useState([])
    useEffect(() => {
        fetch('/api/comment/list?id=' + props._id).then(r => r.json()).then((result) => {
            setData(result)
        })
    }, [])

    return (
        <div>
            <div>Comment</div>

            {data.map((a, i) => {
                return (
                    <p key={i}>{a.content}</p>
                )
            })}
            <input onChange={(e) => {
                setComment(e.target.value)
            }} />
            <button onClick={() => {
                fetch('/api/comment/new',
                    {
                        method: 'POST',
                        body:
                            JSON.stringify({
                                comment: comment,
                                _id: props._id
                            })
                    })
            }} >Done</button>
        </div>
    )
}


