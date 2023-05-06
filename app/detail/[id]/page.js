import { getOnePost } from "@/util/database"
import Comment from "./Comment"
import Inventory from "./Stock"
import { notFound } from "next/navigation"
import dayjs from "dayjs";

export default async function Detail(props) {

    let post = await getOnePost(props.params.id)
    post.time = post.time?.toString()
    console.log(post)

    if (!post) {
        return notFound()
    }

    return (
        <div>
            <div className="list-bg" >
                <div className="list-item" >
                    <h1 className="">{post.title}</h1>
                    <h4 className="">{post.content}</h4>
                    <p><span>{post.authorName}</span>  {dayjs(post.time).format("YYYY/MM/DD HH:mm")}</p>
                </div>
            </div>
            <div className="list-bg" >
                <div className="list-item" >
                    <Inventory _id={post._id.toString()} />
                </div>
                <div className="list-item" >
                    <Comment _id={post._id.toString()} />
                </div>
            </div>
        </div>
    )
}

