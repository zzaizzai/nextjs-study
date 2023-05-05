
import { deletePost } from "@/util/database"

export default async function handler(req, res) {

    if (req.method == 'DELETE') {
        
        let result = await deletePost(JSON.parse(req.body)._id)
        return res.status(200).json(result)
    
    }

}