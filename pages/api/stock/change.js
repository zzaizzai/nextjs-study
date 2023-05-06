
import { uploadNewStock } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"


export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.redirect('/')
    }


    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

        if (data.purpose == "") {
            data.purpose = "test"
        }

        if (data.number_change == 0) {
            return res.status(500).json({ err: "Other than 0" })
        }

        const parentId = data._id

        let user = session.user
        let result = await uploadNewStock(parentId, data, user)
        return res.status(200).json(result)
    }

}