
import { getAllStockOfPost } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"


export default async function handler(req, res) {
    let result = await getAllStockOfPost(req.query.id)
    return res.status(200).json(result)
}