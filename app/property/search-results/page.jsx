import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";



const SearchResults = async ({searchParams: {location, propertyType}}) => 
{
    await connectDB()
    
    

    const locationPattern = new RegExp(location,'i')

    let query = {

        $or: 
        [
            {'location.street' : locationPattern},
            {'location.city' : locationPattern},
            {'location.state' : locationPattern},
            {'location.zipcode' : locationPattern}
        ]
    }

    if(propertyType !== 'All'){
        const typePattern = new RegExp(propertyType, 'i')
        query.type = typePattern
    }

    const propertiesQueryResults = await Property.find(query).lean()
    const properties = convertToObject(propertiesQueryResults)

    
    return ( <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm/>
                </div>
            </section>
            <section className="px-4 py-5">
                <div className="container-xl lg:container m-auto px-4 py-6 ">
                    <Link href='/property' className="flex items-center text-blue-500 hover:underline mb-3" >
                      <FaArrowAltCircleLeft className="mr-3 mb-1"/>  Back to Properties
                    </Link>
                    <h1 className="text-2xl mb-4">Search Results</h1>
                    {properties.length === 0 ? (<p>No Search Found</p>) : (
                        <div className="grid grid-col-1 md:grid-cols-3 gap-6">
                            {properties.map((property)=>(
                                <PropertyCard key={property._id} property={property}/>
                            ))}
                        </div>
                    )}
                </div>
            </section>
    </> );
}
 
export default SearchResults;