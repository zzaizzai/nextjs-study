import { getEditPost } from "@/util/database"

export default async function Edit(props) {

    let post = await getEditPost(props.params.id)

    return (
        <div className="container">
            <form action="/api/post/edit" method="POST">
                <label for="title">Title</label>
                <input type="text" name="title" placeholder="Title" defaultValue={post.title} />
                <label for="content">Content</label>
                <textarea type="text" rows="8" cols="70" name="content" placeholder="Content" defaultValue={post.content} />
                <input name="_id" defaultValue={post._id.toString()} style={{ display: 'none' }} />
                <button type="submit">Edit</button>
            </form>
        </div>

    )
}

