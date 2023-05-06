'use client'

import Link from "next/link"
import dayjs from "dayjs";

export default function ListItem({ posts }) {
    
    return (
        <div className="list-bg">

            <a href="/write">New Post</a>
            {posts.map((post, i) =>

                <div className="list-item" key={i}>
                    <Link prefetch={false} href={'/detail/' + post._id}><h4>{post.title}</h4></Link>
                    <p>{dayjs(post.date).format("MM/DD HH:mm")}</p>
                    <Link href={'/edit/' + post._id}>Edit</Link>

                    <span className="mx-10 showPointer" onClick={(e) => {
                        fetch('/api/post/delete', {
                            method: 'DELETE',
                            body: JSON.stringify({ _id: post._id })
                        }).then((r) => {
                            r.json()
                        })
                            .then(() => {
                                e.target.parentElement.style.opacity = 0
                                setTimeout(() => {
                                    e.target.parentElement.style.display = 'none'
                                }, 1000)
                                // console.log(e)
                            }).catch((error) => {
                                console.log(error)
                            })
                    }}>🗑️</span>
                </div>

            )}
        </div>

    )
}