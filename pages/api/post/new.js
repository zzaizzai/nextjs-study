import { connectDB } from "@/util/database"



export default async function handler(req, res) {



    if (req.method == 'POST') {
        console.log(req.body)

        if (req.body.title == '' || req.body.content == '') {
            return res.status(500).json('ss')
        }

        try {
            const db = (await connectDB).db("nextjs")
            let result = await db.collection('post').insertOne(req.body)
        } catch (error) {
            return res.status(500).json('something error')

        }
        return res.status(200).redirect('/list')



    }

}