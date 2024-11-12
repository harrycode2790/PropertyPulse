'use client';
import { useState, useEffect , useRef, useCallback } from 'react';
import { usePathname,} from 'next/navigation';
import Image from 'next/image';
import logo from '@/assests/images/logo-white.png';
import profileDefault from '@/assests/images/profile.png';
import Link from 'next/link';
import {FaGoogle} from 'react-icons/fa'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import DisplayMessage from './DisplayMessageNotification';




const NavBar = () => {

   

    const {data: session} = useSession()
 
    const profileImage = session?.user?.image
    const [ismobileMenuOpen, setIsMobileMenuOpen ] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [providers, setProviders] = useState(null);
    
    const pathname = usePathname();

    useEffect(() => {
      const setAuthProviders = async () => {
        const res = await getProviders();
        setProviders(res);
        
      };
  
      setAuthProviders();
      
  
      // NOTE: close mobile menu if the viewport size is changed
      window.addEventListener('resize', () => {
        setIsMobileMenuOpen(false);
      });
    }, []);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-10 w-auto"
                src={logo}
                alt="PropertyPulse"
              />

              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                > PropertyPulse 
                </span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className= {`${pathname ==='/' ? 'bg-black ' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >Home
                  </Link >
                <Link
                  href="/property"
                  className= {`${pathname === '/property' ? 'bg-black ' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >Properties
                  </Link>
                  {session && (
                    <Link
                    href="/property/add"
                    className= {`${pathname === '/property/add' ? 'bg-black ' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                    >Add Property
                    </Link >
                  )}
                
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => 
                         signIn(provider.id)                                        
                        }
                      className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3'
                    >
                      <FaGoogle className='text-white mr-2' />
                      <span>Login or Register</span>
                    </button>
                  ))}
                  
              </div>
            </div>
          )}
          

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0"
          >
           <DisplayMessage/>
            {/* <!-- Profile dropdown button --> */}
            <div className="relative ml-3">
              <div>
                
                  <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileOpen((prev)=> !prev )}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileImage || profileDefault}
                    width={40}
                    height={40}
                    alt=""
                  />
                </button>

              
                
              </div>
{/* 
              <!-- Profile dropdown --> */}
              {isProfileOpen && (
                <div
                id="user-menu"
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-blue-500  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-white"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  onClick={() => (setIsProfileOpen(false))}
                  >Your Profile</Link >
                <Link
                  href="/property/saved"
                  className="block px-4 py-2 text-sm text-white"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={() => (setIsProfileOpen(false))}
                  >Saved Properties</Link                >
                <button
                  
                  className="block px-4 py-2 text-sm text-white"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={() => {
                    setIsProfileOpen(false)
                    signOut()
                  }}
                  >Sign Out</button              >
              </div>
              )}
              
            </div>
          </div>

          )}
          
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {ismobileMenuOpen && (

                <div className="" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link
                        href="/"
                        className={`${pathname === '/' ? 'bg-black': 'hover:bg-gray-700 hover:text-white '} text-gray-300 block rounded-md px-3 py-2 text-base font-medium`}
                        >Home</ Link        >
                    <Link
                        href="/property"
                        className={`${pathname === '/property' ? 'bg-black': 'hover:bg-gray-700 hover:text-white '} text-gray-300 block rounded-md px-3 py-2 text-base font-medium`}
                        >Properties
                        </Link>
                        {session && (
                          <Link
                          href="/property/add"
                          className={`${pathname === '/property/add' ? 'bg-black': 'hover:bg-gray-700 hover:text-white '} text-gray-300 block rounded-md px-3 py-2 text-base font-medium`}
                          >Add Property
                          </Link>

                        )}
                  {!session && (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => 
                         signIn(provider.id)                                        
                        }
                      className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3'
                    >
                      <FaGoogle className='text-white mr-2' />
                      <span>Login or Register</span>
                    </button>
                  ))}
                  
              </div>
            </div>
          )}
                    
                    </div>
                </div>
      )}
      
    </nav>
  )
}

export default NavBar