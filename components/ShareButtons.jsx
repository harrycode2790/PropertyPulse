'use client'
import { useState } from "react";
import { FaShare } from "react-icons/fa";
const ShareButtons = ({property}) => {
    const [color , setColor] = useState('orange-500')
    const randomColor = () => {
        const colorPicks = ['blue-500', color,'red-500', 'green-400']
        const randomIndex = Math.floor(Math.random() * colorPicks.length)
        return colorPicks[randomIndex]
    }    
    
    return ( 
        <>
             <button className= {`bg-${color} hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`} >

            <FaShare className="mr-2" /> Share {property.name} Property 

            </button>
            <button className="bg-black text-white font-bold rounded-md p-2" onClick={() => setColor(randomColor())} >change Color</button>
        </>      
     );
}
 
export default ShareButtons;