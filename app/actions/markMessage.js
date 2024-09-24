'use server'
import connectDB from "@/config/database"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function MarkMessage (MessageID){
    await connectDB
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userID) {
        throw new Error('User Required ')
    }
    const {userID} = sessionUser

    const message = await Message.findById(MessageID)

    if(!message) throw new Error('Message not Fpund')   


  // verify ownership of message

    if(message.recipient.toString() !== userID ){
        throw new Error('unauthorize')
    }

    message.read = !message.read

    revalidatePath('/message', 'page')

    await message.save()

    return message.read
    

   

}

export default MarkMessage
