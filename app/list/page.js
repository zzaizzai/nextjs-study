import { connectDB } from "@/util/database"
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic' 


export default async function List() {

  const client = await connectDB;
  const db = client.db("nextjs")

  let posts = await db.collection('post').find().toArray()
  posts.forEach(element => {
    element._id = element._id.toString()
  });

  return (
    <div className="list-bg">
      <ListItem posts={posts} />
    </div>
  )
} 