'use client'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon
} from "react-share"
import { useState } from "react";
import { FaShare } from "react-icons/fa";
const ShareButtons = ({property}) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/property/${property._id}`
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
            <h3 className="text-xl font-bold text-center pt-2">Share This Property</h3>
            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, '')}forrent`}>
                    <FacebookIcon size={40} round={true}/>
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}>
                    <TwitterIcon size={40} round={true}/>
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl} title={property.name} separator="::">
                    <WhatsappIcon size={40} round={true}/>
                </WhatsappShareButton>
                <EmailShareButton  subject={property.name} body={`check out this property listing ${shareUrl}`}>
                    <EmailIcon size={40} round={true}/>
                </EmailShareButton>
            </div>
            <button className="bg-black text-white font-bold rounded-md p-2" onClick={() => setColor(randomColor())} >change Color</button>

        </>      
     );
}
 
export default ShareButtons;