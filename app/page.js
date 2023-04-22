import { connectDB } from "@/util/database"



export default async function Home() {

  const db = (await connectDB).db("nextjs")
  
  let result = await db.collection('study1').find().toArray()

  // console.log(result)

  let name = 'park'

  return (
    <main>

      <div>
        <h1 className="title">Programming Log</h1>
        <p className="title-sub">by dev kim</p>
      </div>
    </main>
  )
}
