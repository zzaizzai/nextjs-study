import ListItem from "./ListItem";
import { getAllPosts } from "@/util/database"

export const dynamic = 'force-dynamic'


export default async function List() {

  let posts = await getAllPosts()

  posts.forEach(element => {
    element._id = element._id.toString()
    element.time = element.time?.toString()
    element.date = element.date?.toString()
  });

  return (
    <div className="list-bg">
      <ListItem posts={posts} />
    </div>
  )
} 