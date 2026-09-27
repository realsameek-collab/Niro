import React from 'react'
import axios from 'axios'
import Auth from '../components/Auth'
import { serverUrl } from '../App'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SiValorant } from "react-icons/si";
import { motion, AnimatePresence } from "motion/react"
import { HiSparkles } from "react-icons/hi2";
import {
  TbArrowRight, TbBrandNpm, TbCode, TbLayout,
  TbAdjustments, TbPlayerPlay, TbCopy, TbCheck,
  TbMenu2, TbX, TbLogout, TbComponents
} from "react-icons/tb";
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showAuth, setshowAuth] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getLetters = (name) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  }
  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      navigate("/")

    } catch (error) {
      console.log(error)
    }
    setProfileOpen(false)
  }

  return (
    <div className='min-h-screen bg-[#030b0d] text-white overflow-x-hidden'
      style={{ fontFamily: "'DM Sans',sans-serif" }}>

      <div className='fixed inset-0 z-0
           bg-[radial-gradient(circle,rgba(59,232,255,0.05)_1px,transparent_1px)]
           bg-[size:26px_26px]
           pointer-events-none' />


      <div className='fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-64
         bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)] pointer-events-none'/>

      <nav className='sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-4 
        border-b border-white/[0.05] bg-[#030b0d]/85 backdrop-blur-md'>
        <div className='flex items-center gap-2.5'>
          <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex 
          items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]'>
            <SiValorant size={15} color='#051c20' />
          </div>
          <span className='text-xl font-bold text-[#e8f8fa] tracking-tight' style={{ fontFamily: "'Syne', sans-serif" }}>
            NiroUI </span>

        </div>
        <div className='hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/50'>
          <button className=' duration-200 px-6 py-2.5 border 
            border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 
            transition-all cursor-pointer bg-transparent w-full'>components</button>
          {userData ? (
            <div className='relative'>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className='flex items-center gap-2.5 bg-white/[0.06] border border-white/10 
                hover:border-[#3be8ff]/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer'>
                <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] 
                flex items-center justify-center text-[#030b0d] text-[11px] font-bold'>
                  {getLetters(userData.name)}
                </div>
                <span className='text-white/80 text-sm font-medium max-w-[100px] truncate'>{userData.name}</span>
              </motion.button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className='absolute right-0 top-12 w-52 bg-[#0a1a1e] border border-white/[0.09] 
                    rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50'
                  >
                    <div className='px-4 py-3.5 border-b border-white/[0.07]'>
                      <p className='text-white/90 font-semibold text-sm truncate'>
                        {userData.name}
                      </p>
                      <p className='text-white/40 text-xs truncate mt-0.5'>
                        {userData.email}
                      </p>
                    </div>
                    <div className='py-1.5'>
                      <button onClick={() => setProfileOpen(false)}
                        className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 
                        hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer 
                        bg-transparent border-none text-left'>
                        <TbComponents size={16} className="text-[#3be8ff]/70" />
                        My Components
                      </button>
                    </div>
                    <div className='border-t border-white/[0.07] py-1.5'>
                      <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80
                       hover:text-red-400 hover:bg-red-500/[0.06] transition-colors cursor-pointer 
                       bg-transparent border-none text-left'>
                        <TbLayout size={16} /> logout
                      </button>
                    </div>



                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ) : (
            (<motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setshowAuth(true)}
              className='flex items-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2 rounded-lg text-sm 
              font-semibold cursor-pointer border-none shadow-[0_0_20px_rgba(59,232,255,0.25)] 
              hover:shadow-[0_0_30px_rgba(59,232,255,0.4)] transition-shadow text-nowrap'
            >
              <HiSparkles size={14} /> Generate AI Component
            </motion.button>
            )
          )}

        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className='md:hidden text-white/60 hover:text-white transition-colors 
        bg-transparent border-none cursor-pointer'>
          {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
        </button>



      </nav>


      <AnimatePresence>
        {
          menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className='md:hidden sticky top-[65px] z-30 bg-[#030b0d]/95 backdrop-blur-md border-b border-white/[0.05] px-4 py-4 flex flex-col gap-3'>
              <button className='text-sm text-white/60 hover:text-white transition-colors py-1'>Components</button>
              {userData ? (
                <>
                  <div className='flex items-center gap-2.5 py-2 border-t border-white/[0.07]'>
                    <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold'>
                      {getLetters(userData.name)}
                    </div>
                    <span className='text-white/80 text-sm font-medium'>
                      {userData.name}
                    </span>
                  </div>
                  <button className='flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors py-1 bg-transparent border-none cursor-pointer text-left'>
                    <TbComponents size={15} className="text-[#3be8ff]/70" /> My Components
                  </button>

                </>
              ) : (
                <button
                  onClick={() => {
                    setshowAuth(true)
                    setMenuOpen(false)
                  }}
                  className='flex items-center gap-2 text-sm text-[#3be8ff] hover:text-white transition-colors py-2 bg-transparent border-none text-left cursor-pointer'>
                  <HiSparkles size={16} /> Sign in
                </button>
              )}
            </motion.div>
          )
        }
      </AnimatePresence>









      {showAuth && <Auth onClose={() => setshowAuth(false)} />}
    </div >
  )
}

export default Home