import { MongoClient } from 'mongodb'
import config from './config'

const url = `mongodb+srv://${config.name}:${config.password}@cluster0.akash.mongodb.net/?retryWrites=true&w=majority`
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
export { connectDB }