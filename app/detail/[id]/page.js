import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Comment from "./Comment"


export default async function Detail(props) {

    const db = (await connectDB).db("nextjs")
    let post = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })

    return (
        <div>
            <h5>good</h5>
            <h5>{post.title}</h5>
            <h2>bye</h2>
            <Comment _id={post._id.toString()} />

        </div>
    )
}

