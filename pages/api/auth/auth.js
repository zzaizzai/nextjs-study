import { getServerSession } from "next-auth"
import { authOptions } from "./[...nextauth]"



async function isLoggedIn() {
    let session = await getServerSession(authOptions)
    if (session == null) {
        return false
    } else {
        return true
    }
}

async function getUserData() {
    let session = await getServerSession(authOptions)
    if (session) {
        return session.user
    } else {
        return null
    }
}

module.exports = { isLoggedIn, getUserData }