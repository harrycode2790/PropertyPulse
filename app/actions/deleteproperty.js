'use server'
import cloudiary from "@/config/cloudinary"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"


async function deleteProperty (propertyID){
    
    await connectDB()
    const sessionUser = await getSessionUser()
    if(!sessionUser || !sessionUser.userID){
        throw new Error('userID is required')
    }

    const { userID } = sessionUser

    const property = await Property.findById(propertyID)

    if(!property) throw new Error('property not found')

    //verify ownership

    if(property.owner.toString() !== userID){
        throw new Error ('UnAuthorized')
    }

     // delete image from cloudnary
    // extract public ID from image URLS
    const publicID = property.images.map((imageURL) => {
        const parts = imageURL.split('/')
        return parts.at(-1).split('.').at(0)
    })

    // delete image from cloudnary 
    if(publicID.length > 0) {
        for(let publicid of publicID ){
            await cloudiary.uploader.destroy('propertyPulse/' + publicid)
        }
    }

    await property.deleteOne()

    revalidatePath('/' , 'layout')

   

}

export default deleteProperty 