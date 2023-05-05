// import { connectDB } from "@/util/database"
// import { ObjectId } from "mongodb"
import { uploadEditPost } from "@/util/database"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let newData = {
            title: req.body.title,
            content: req.body.content
        }
        let result = await uploadEditPost(req.body._id, newData)
        return res.status(200).redirect('/list')
    }

}