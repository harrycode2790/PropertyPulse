'use server'
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudiary from "@/config/cloudinary";

 
 async function addproperty(formData) {
    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userID ) {
        throw new Error ('User ID is required ')
    }

    const { userID } = sessionUser


    // access both amenities and images  
   const amenities =  formData.getAll('amenities')
   const images = formData
   .getAll('images')
   .filter((image) => image.name !== '')
   

   const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userID,
    images,
  };
  // upload image gotten from the formdata and send to cloudinary
    const imageUrl = []
    for(const imageFile of images ){
        const imageBuffer = await imageFile.arrayBuffer()
        const imageArray = Array.from(new Uint8Array(imageBuffer))
        const imageData = Buffer.from(imageArray)

        // covert the image data to base 64

        const imageBase64 = imageData.toString('base64')

        // make request to clounary 
        const result = await cloudiary.uploader.upload(`data:image/png;base64,${imageBase64}`, {folder: 'propertyPulse'})
        imageUrl.push(result.secure_url)
    }

    // equate the formatted imageurl and set it to immages property of the propertyDAta

    propertyData.images = imageUrl

   const newProperty = new Property(propertyData)
   await newProperty.save()

   revalidatePath('/', 'layout')
   

   redirect(`/property/${newProperty._id}`)
   
}

export default addproperty;