import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import {
    FiZap, FiSave, FiEye, FiCode, FiUploadCloud, FiArrowRight,
    FiLoader, FiPackage, FiAlertCircle, FiCheckCircle, FiCpu,
    FiLayers, FiArrowLeft, FiRefreshCw, FiPlus,
} from "react-icons/fi";

function Generate() {
    return (
        <div className='min-h-screen text-white relative overflow-hidden'
            style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)" }}
        >

            <div className='absolute inset-0 pointer-events-none opacity-10'
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className='absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full pointer-events-none opacity-20'
                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className='absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full pointer-events-none opacity-15'
                style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", filter: "blur(60px)" }}
            />

            <div className='relative z-10 max-w-5xl mx-auto px-4 py-12'>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center mb-12'>

                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6' style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
                        <FiCpu size={14} className="text-indigo-400" />
                        <span className='text-xs font-semibold tracking-widest text-indigo-300 uppercase'>
                            AI Component Studio
                        </span>
                    </div>
                    <h2 className='text-5xl font-bold mb-3 leading-tight'
                        style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
                    >
                        <span className='text-white'>Build with</span>
                        <span style={{ background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> AI</span>
                    </h2>

                    <p className='text-white/40 text-base max-w-md mx-auto'>
                        Describe your React component in plain English. Preview, save, and
                        publish – all in one place.
                    </p>


                </motion.div>

            </div>

        </div>
    )
}

export default Generate