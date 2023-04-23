import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"



export default async function handler(req, res) {
    const db = (await connectDB).db("nextjs")
    let result = await db.collection('post-comment').find({ parent: new ObjectId(req.query.id) }).toArray()
    return res.status(200).json(result)





}