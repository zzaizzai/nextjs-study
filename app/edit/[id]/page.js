import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"


export default async function Edit(props) {

    const db = (await connectDB).db("nextjs")
    let post = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })

    return (
        <div className="p-20">
            <h4>글편집</h4>
            <form action="/api/post/edit" method="POST">
                <input name="title" placeholder="title" defaultValue={post.title} />
                <input name="content" placeholder="content" defaultValue={post.content} />
                <input name="_id" defaultValue={post._id.toString()} style={{ display: 'none' }} />
                <button type="submit">Edit</button>
            </form>
        </div>

    )
}

