export default function Write() {
    return (
        <div>
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="title" />
                <input name="content" placeholder="content" />
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}