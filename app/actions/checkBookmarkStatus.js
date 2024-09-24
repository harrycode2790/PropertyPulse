'use server'
import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"

async function checkBookmarkStatus (propertyID){
    await connectDB
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userID) {
        throw new Error('User Required ')
    }
    const {userID} = sessionUser

    const user = await User.findById(userID)

    let isBookmarked = user.bookmarks.includes(propertyID)

    return {isBookmarked}

}

export default checkBookmarkStatus
