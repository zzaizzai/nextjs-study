import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";
import dayjs from "dayjs";
import { getAllPosts } from "@/util/database"

export const dynamic = 'force-dynamic'


export default async function List() {

  let posts = await getAllPosts()

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