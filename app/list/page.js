import { connectDB } from "@/util/database"
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";
import dayjs from "dayjs";


export const dynamic = 'force-dynamic'


export default async function List() {

  const client = await connectDB;
  const db = client.db("nextjs")

  let posts = await db.collection('post').find().sort({ time: -1 }).toArray()
  posts.forEach(element => {
    element._id = element._id.toString()
    element.time = element.time?.toString()
  });

  return (
    <div className="list-bg">
      <ListItem posts={posts} />
    </div>
  )
} 