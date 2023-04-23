import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"



export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.redirect('/')
    }
    console.log(!session)
    if (req.method == 'POST') {
        let data = JSON.parse(req.body)

        let newData = {
            content: data.comment,
            parent: new ObjectId(data._id),
            author: session.user.email,
        }


        try {

            const db = (await connectDB).db("nextjs")
            let result = await db.collection('post-comment').insertOne(newData)

        } catch (error) {
            return res.status(500).json('something error')

        }
        return res.status(200).redirect('done')



    }

}