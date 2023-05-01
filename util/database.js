import { MongoClient, ObjectId } from 'mongodb'


require("dotenv").config();

const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.akash.mongodb.net/?retryWrites=true&w=majority`
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}



async function checkConnect() {
  try {
    const db = (await connectDB).db("nextjs");
    const documents = await db.collection('study1').find().toArray();
    console.log("Connect Good")
    return documents
  } catch (err) {
    console.error(err)
  }
}

async function getAllPosts() {
  try {
    const db = (await connectDB).db("nextjs");
    const documents = await db.collection('post').find().toArray();
    return documents
  } catch (err) {
    console.error(err)
  }
}

async function getOnePost(_id) {
  try {
    const db = (await connectDB).db("nextjs");
    const documents = await db.collection('post').findOne({ _id: new ObjectId(_id) })
    return documents
  } catch (err) {
    console.error(err)
  }
}

async function getCommentsOfPost(parentId) {
  try {
    const db = (await connectDB).db("nextjs");
    const documents = await db.collection('post-comment').find({ parent: new ObjectId(parentId) }).toArray()
    return documents
  } catch (err) {
    console.error(err)
  }

}


module.exports = {
  checkConnect, getAllPosts, getOnePost, getCommentsOfPost
}