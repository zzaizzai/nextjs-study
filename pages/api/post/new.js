import { uploadNewPost } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)
    let user = session.user
    if (!session) {
        return res.status(500).json({ error: "please login" })
    }

    if (req.method == 'POST') {
        console.log(req.body)

        let newData = req.body

        if (req.body.title == '' || req.body.content == '') {
            return res.status(500).json('ss')
        }

        let result = await uploadNewPost(newData, user)
        return res.status(200).redirect('/list')
    }

    return res.status(200).redirect('/write')

}