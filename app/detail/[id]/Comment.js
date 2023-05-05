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
            <h3>Comment</h3>

            {data.map((a, i) => {
                return (

                    <div key={i} className="comment">
                        <img className="comment-author-image" src={a.authorImage ?? "https://source.boringavatars.com/beam"} alt="Sample Image" width={500} height={300} />
                        {a.authorName ? a.authorName : <div>unknown</div>}: {a.content ? a.content : <div>????</div>}
                    </div>
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
                    }).then(() => {
                        location.reload()
                    })
            }} >Done</button>
        </div>
    )
}


