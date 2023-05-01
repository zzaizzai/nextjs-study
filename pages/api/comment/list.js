import { getCommentsOfPost } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"



export default async function handler(req, res) {
    let result = await getCommentsOfPost(req.query.id)
    return res.status(200).json(result)
}