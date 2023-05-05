import { uploadComment } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"



export default async function handler(req, res) {



    if (req.method == 'POST') {

        let session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.redirect('/')
        }


        let data = JSON.parse(req.body)

        try {
            let result = await uploadComment(data.comment, data._id, session.user)
            return res.redirect(200)
        } catch (error) {
            return res.status(500).json('something error')
        } finally {

        }

    }

}