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

async function getAllPosts(sort) {
  var sort_db = -1

  if (sort == "date") {
    sort_db = -1
  }
  try {
    const db = (await connectDB).db("nextjs");
    const documents = await db.collection('post')
      .find()
      .sort({ date: sort_db })
      .toArray();
    return documents
  } catch (err) {
    console.error(err)
  }
}

async function getAllStockOfPost(parentId) {
  const db = (await connectDB).db("nextjs");
  const documents = await db.collection('stock').find({ parent: new ObjectId(parentId) }).toArray()
  return documents
}

async function uploadNewStock(parentId, data, author) {

  var newData = {
    parent: new ObjectId(parentId),
    positive: data.positive,
    purpose: data.purpose,
    number_change: data.number_change,
    authorEmail: author.email,
    authorName: author.name,
    authorImage: author.image,
    date: new Date(),
  }

  const db = (await connectDB).db("nextjs")
  let result = await db.collection('stock').insertOne(newData)

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

async function uploadComment(content, parentId, author) {

  let newData = {
    content: content,
    parent: new ObjectId(parentId),
    authorName: author.name,
    authorEmail: author.email,
    authorImage: author.image,
    date: new Date()
  }
  try {
    const db = (await connectDB).db("nextjs")
    let result = await db.collection('post-comment').insertOne(newData)
    return result
  } catch (err) {
    console.error(err)
  }
}

async function deletePost(id) {
  try {
    const db = (await connectDB).db("nextjs");
    const result = await db.collection('post').deleteOne({ _id: new ObjectId(id) })
    const result_2 = await db.collection('post-comment').deleteMany({ parent: new ObjectId(id) })
    return result
  } catch (err) {
    console.error(err)
  }
}

async function getEditPost(id) {
  try {
    const db = (await connectDB).db("nextjs");
    let post = await db.collection('post').findOne({ _id: new ObjectId(id) })
    return post
  } catch (err) {
    console.error(err)
  }
}

async function uploadEditPost(id, newData_obj) {
  try {
    const db = (await connectDB).db("nextjs");
    let result = await db.collection('post').updateOne(
      { _id: new ObjectId(id) },
      { $set: newData_obj }
    )
    return result
  } catch (err) {
    console.error(err)
  }
}

async function uploadNewPost(data, author) {

  let newData = {
    title: data.title,
    content: data.content,
    date: new Date(),
    authorEmail: author.email,
    authorName: author.name,
    authorImage: author.image,
  }

  try {
    const db = (await connectDB).db("nextjs")
    let result = await db.collection('post').insertOne(newData)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  checkConnect, getAllPosts, getOnePost,
  getCommentsOfPost, uploadComment,
  deletePost, getEditPost, uploadEditPost,
  uploadNewPost, uploadNewStock, getAllStockOfPost
}