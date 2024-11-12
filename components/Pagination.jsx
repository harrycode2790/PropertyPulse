import Link from "next/link";

const Pagination = ({page , pageSize, totalItems}) => {

    const totalPages = Math.ceil(totalItems / pageSize )
  
    return ( <section className="conatiner mx-auto flex justify-center items-center my-8">
        {page === 1 ? null : (
             <Link href={`/property?page=${page - 1}`} className="mr-2 px-2 py-1 border border-gray-200 rounded">
            Previous
            </Link>
        )}      
        <span className="mx-2">{`Page ${page} of ${totalPages}`}</span>
        {page === totalPages ? null : (
             <Link href={`/property?page=${page + 1}`} className="ml-2 px-2 py-1 border border-gray-200 rounded">
             Next
            </Link>
        )}
       
    </section> );
}
 
export default Pagination;