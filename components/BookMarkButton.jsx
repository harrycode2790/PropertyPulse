'use client'
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookMarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookMarkButton = ({property}) => {
    const {data: session } = useSession()
    console.log(session.user.name);
    const userId = session?.user?.id;

    const handleClick = async () => {
      if(!userId){
        toast.error('You Need to sign In')
        return
      }

      bookmarkProperty(property._id).then((res) => {
        if(res.error) return toast.error(res.error)
        toast.success(res.message)
      }) 
    
    }
    return ( 
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={() => handleClick()}
      >
        <FaBookmark className="mr-2"/> Bookmark Property
      </button>
     );
}
 
export default BookMarkButton;