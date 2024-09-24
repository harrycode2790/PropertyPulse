'use server'

import connectDB from "@/config/database"
import Message from "@/models/Message"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"


async function deleteMessage (messageID){
    
    await connectDB()
    const sessionUser = await getSessionUser()
    if(!sessionUser || !sessionUser.userID){
        throw new Error('userID is required')
    }

    const { userID } = sessionUser

    const message = await Message.findById(messageID)

    if(message.recipient.toString() !== userID) {
        throw new Error('You cant delete this message')
    }

    await message.deleteOne()
    

    revalidatePath('/' , 'layout')

   

}

export default deleteMessage 