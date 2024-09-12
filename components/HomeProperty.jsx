
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";
const HomeProperty = async () => {

    await connectDB()
    
    const recentProperties =  await Property.find({}).sort({createdAt : -1}).limit(3).lean()
    



  return (
    <>
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.length === 0 ? (
                <p> No Properties </p>
            ) : recentProperties.map((property)=> <PropertyCard key = {property._id} property = {property} />)}

         </div>
         </div>
         </section>
         <section className="m-auto max-w-lg my-6 px-6 ">
            <Link href='/property'className="block bg-black text-white text-center py-4 px-4 rounded-xl hover:bg-gray-700" > View All Properties</Link>

         </section>
    </>
  )
}

export default HomeProperty
