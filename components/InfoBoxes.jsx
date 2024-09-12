import Link from 'next/link'
import React from 'react'
import InfoBox from './InfoBox'

const InfoBoxes = () => {
  return (
   <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
    
          <InfoBox 
          heading='For Rentals'
          buttonInfo={{
            text:'Browse Homes',
            link: '/property',
            backgroundColor: 'bg-black'
          }}
          
          >
             Find your Dream rental property. BookMark Properties and Contact Owners

          </InfoBox>

          <InfoBox 
          heading='For Property Owners'
          backgroundColor='bg-blue-100'
          buttonInfo={{
            text:'Add property',
            link: '/property/add',
            backgroundColor : 'bg-blue-500'
          }}>
            List your properties and reach potential tenants. Rent as an
            airbnb or long term.

          </InfoBox>

          <InfoBox 
          heading = 'for rental purpose'
          backgroundColor='bg-green-400'
          buttonInfo={{
            text: 'Add property',
            link: '/property/add',
            backgroundColor: 'bg-red-700'
          }}
          >
            List your properties and reach potential tenants. Rent as an
            airbnb or long term.

          </InfoBox>

           

         
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes