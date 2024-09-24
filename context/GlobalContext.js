'use client'
import {createContext, useState, useContext, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import getUnreadMessageCount from '@/app/actions/getUnreadMessage'

// create context
const GlobalContext = createContext()

// create provider

export function GlobalProvider({children})  {
    const [unreadCount ,setUnreadCount] = useState(0)
    const {data:session} = useSession()
    
    useEffect(() => {
        if(session && session.user){
            getUnreadMessageCount().then((res) => {
                setUnreadCount(res.count)
            })
        }
    }, [getUnreadMessageCount, session])

    return (
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount
        }}>

            {children}

        </GlobalContext.Provider>
    )

}

export function useGlobalContext(){
    return useContext(GlobalContext)
}
