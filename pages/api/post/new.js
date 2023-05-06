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

        let newData = req.body

        if (req.body.title == '' || req.body.content == '') {
            return res.status(500).redirect('/write')
        }

        let result = await uploadNewPost(newData, user)
        var id_new = result.insertedId.toString()
        return res.status(200).redirect('/detail/' + id_new)
    }

    return res.status(200).redirect('/write')

}