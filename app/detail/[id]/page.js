import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"


export default async function List(props) {

    const db = (await connectDB).db("nextjs")
    let post = await db.collection('post').findOne({_id: new ObjectId("6443b2334ce9ef5c09e0a8f2") })

    console.log(props.params.id)
    return (
        <div>
            <h5>good</h5>
            <h5>{post.title}</h5>
            <h2>bye</h2>
        </div>
    )
}

