'use client'

import Link from "next/link"


export default function ListItem({ posts }) {

    return (
        <div className="list-bg">
            {posts.map((post, i) =>

                <div className="list-item" key={i}>
                    <Link prefetch={false} href={'/detail/' + post._id}><h4>{post.title}</h4></Link>
                    <p>1월 1일</p>
                    <Link href={'/edit/' + post._id}>Edit</Link>

                    <span onClick={(e) => {
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