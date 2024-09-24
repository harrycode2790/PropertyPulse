import NavBar from '@/components/NavBar'
import '@/assests/styles/global.css'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'  
import { GlobalProvider } from '@/context/GlobalContext'



 export const metadata = {
    title: 'PropertyPulse  | Find your perfect home ',
    description: 'find your dream home'

}

const Mainlayout = ({children}) => {
  return (
    <AuthProvider>
      <GlobalProvider>
      <html lang="en">
          <body>
            <NavBar/>
            <main> {children} </main>
            <Footer/>   
            <ToastContainer/>       
          </body>       
      </html> 
      </GlobalProvider>
     </AuthProvider>  
  )      
}
export default Mainlayout