import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { getSession } from "../auth/auth"


export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(500).redirect('/api/auth/signin')
    }

    if (req.method == 'POST') {
        console.log(req.body)

        let newData = req.body
        newData.time = new Date()
        newData.authorEmail = session.user.email

        console.log(newData)
        if (req.body.title == '' || req.body.content == '') {
            return res.status(500).json('ss')
        }

        try {
            const db = (await connectDB).db("nextjs")
            let result = await db.collection('post').insertOne(newData)
        } catch (error) {
            return res.status(500).json('something error')

        }
        return res.status(200).redirect('/list')
    }

    return res.status(200).redirect('/write')

}