import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import '@/models/Property'
import { convertToObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const MessagePage =  async () => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const {userID} = sessionUser

    const readMessage = await Message.find({recipient: userID, read: true }).sort({createdAt: -1}).populate('sender', 'username').populate('property', 'name').lean()

    const unreadMessage = await Message.find({recipient: userID, read: false }).sort({createdAt: -1}).populate('sender', 'username').populate('property', 'name').lean()

    const messages = [...unreadMessage, ...readMessage].map((messageDoc) => {
        const message = convertToObject(messageDoc)
         message.sender = convertToObject(messageDoc.sender)
         message.property = convertToObject(messageDoc.property)
         return message
    })


    return ( 
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div className="bg-white px-6 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4 ">Your Messages</h1>
                    <div className="space-y-4">
                        {messages.length === 0 ? (<p>You have no messages</p>) : (
                            messages.map((message) => (
                                <MessageCard key={message._id} message={message}/>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </section>
     );
}
 
export default MessagePage;