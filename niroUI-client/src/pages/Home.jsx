import React from 'react'
import Auth from '../components/Auth'
import { useState } from 'react'

function Home() {
    const [showAuth , setshowAuth] = useState(false)
  return (
    <div className=''>
        <button className = 'px-4 py-2 bg-black text-white' onClick={()=>setshowAuth(true)}>
            open
        </button>
        
        {showAuth && <Auth onClose={()=>setshowAuth(false)}/>}
    </div>
  )
}

export default Home