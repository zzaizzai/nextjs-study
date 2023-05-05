export default function Write() {
    return (
        <div className="container">
            <form action="/api/post/new" method="POST">
                <label for="title">Title</label>
                <input type="text" name="title" placeholder="Title" />
                <label for="content">Content</label>
                <input type="text" name="content" placeholder="Content" />
                <button type="submit">Write</button>
            </form>
        </div>
    )
}