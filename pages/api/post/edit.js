import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"


export default async function handler(req, res) {



    if (req.method == 'POST') {
        console.log(req.body)
        let newData = {
            title: req.body.title,
            content: req.body.content
        }

        const db = (await connectDB).db("nextjs")
        let result = await db.collection('post').updateOne(
            { _id: new ObjectId(req.body._id) },
            { $set: newData }
        )
        console.log(result)
        return res.status(200).redirect('/list')



    }

}