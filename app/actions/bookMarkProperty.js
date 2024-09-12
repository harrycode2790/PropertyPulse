'use server'
import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function bookmarkProperty(propertyId) {
    await connectDB
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userID) {
        throw new Error('User Required ')
    }
    const {userID} = sessionUser

    const user = await User.findById(userID)

    let isBookmarked = user.bookmarks.includes(propertyId)

    let message

    if(isBookmarked){
        // if bookmarked then delete bookmark
        user.bookmarks.pull(propertyId)
        message = 'Bookmark Removed'
        isBookmarked = false 
    }else{
        // if not bookmarked , then add
        user.bookmarks.push(propertyId)
        message = 'Bookmark Added'
        isBookmarked = true
    }

    await user.save()
    revalidatePath('property/saved', 'page')

    return {
        message,
        isBookmarked
    }


}

export default bookmarkProperty