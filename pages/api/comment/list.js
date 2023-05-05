import { getCommentsOfPost } from "@/util/database"

export default async function handler(req, res) {
    let result = await getCommentsOfPost(req.query.id)
    return res.status(200).json(result)
}