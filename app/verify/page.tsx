"use client";

import React, { useRef, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import { IconSearch, IconDownload, IconCheck, IconX, IconBrandGithub } from "@tabler/icons-react";
import html2canvas from "html2canvas";
import { motion, AnimatePresence } from "motion/react";
import Tilt from "react-parallax-tilt";
import { QRCodeCanvas } from "qrcode.react";

type UserData = {
  tag: string;
  name: string;
  role: string;
  github: string;
  avatar: string;
  joinDate?: string;
};

export default function VerifyPage() {
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [userData, setUserData] = useState<UserData | null>(null);
  
  // Refs
  const cardRef = useRef<HTMLDivElement>(null); // Visual card
  const exportRef = useRef<HTMLDivElement>(null); // Hidden flat card for export
  
  // Dummy refs for Navbar
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);

  const handleVerify = async () => {
    if (!tag.trim()) return;
    setStatus("loading");
    setUserData(null);

    try {
      const response = await fetch("/verified_users.json");
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const users: UserData[] = await response.json();
      const user = users.find((u) => u.tag.toLowerCase() === tag.trim().toLowerCase());

      setTimeout(() => {
        if (user) {
          setUserData(user);
          setStatus("success");
        } else {
          setStatus("error");
        }
      }, 1000);
    } catch {
      setStatus("error");
    }
  };

  const handleDownload = async () => {
    if (exportRef.current && userData) {
      // Small delay to ensure rendering
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: null,
        scale: 3, // Very high resolution for 'nice format'
        useCORS: true,
        logging: false,
      } as any);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `OSQ-Identity-${userData.tag}.png`;
      link.click();
    }
  };

  // Shared Card Content Component
  const IdCardContent = ({ isExport = false }: { isExport?: boolean }) => {
    if (!userData) return null;
    
    return (
        <div 
            className={`relative overflow-hidden rounded-[24px] bg-[#0a0a0a] text-white font-sans select-none
                ${isExport ? 'w-[600px] h-[379px]' : 'w-full h-full'}
            `}
            style={{
                background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
                boxShadow: isExport ? "none" : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255,255,255,0.1)"
            }}
        >
            {/* Design Accents */}
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-green-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            
            {/* Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.07]" 
                style={{backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px"}}
            />

            {/* Content Container */}
            <div className={`relative z-10 flex flex-col justify-between h-full ${isExport ? 'p-10' : 'p-6 md:p-8'}`}>
                
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/5">
                            <span className="font-extrabold text-black text-lg tracking-tighter">OSQ</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white tracking-wide text-sm">OFFICIAL MEMBER</h3>
                                {isExport && <div className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20 font-mono">VERIFIED</div>}
                            </div>
                            <p className="text-[10px] text-neutral-500 font-mono tracking-widest mt-0.5">OPEN SOURCE QUEST</p>
                        </div>
                    </div>
                    {/* QR Code */}
                    <div className="bg-white p-1.5 rounded-lg shadow-sm">
                         <QRCodeCanvas 
                            value={`https://portfolio.r3actr.com/${userData.tag}`} 
                            size={isExport ? 60 : 48}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level={"L"}
                            marginSize={0}
                         />
                    </div>
                </div>

                {/* Main Body */}
                <div className="flex items-end gap-6 mt-4">
                    <div className={`relative ${isExport ? 'w-24 h-24' : 'w-20 h-20'} shrink-0`}>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 to-purple-500 p-[3px]">
                            <div className="w-full h-full rounded-full bg-black p-[2px] overflow-hidden">
                                <img 
                                    src={userData.avatar} 
                                    alt="Avatar" 
                                    className="w-full h-full rounded-full object-cover bg-neutral-800"
                                    crossOrigin="anonymous" 
                                />
                            </div>
                        </div>
                         <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0a0a0a] rounded-full flex items-center justify-center border border-white/10">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                         </div>
                    </div>

                    <div className="pb-1" style={{ width: "100%" }}>
                        <h2 className={`${isExport ? 'text-4xl' : 'text-3xl'} font-bold text-white leading-tight mb-1 truncate`}>
                            {userData.name}
                        </h2>
                        <div className="flex items-center gap-2 text-green-400 font-medium">
                            <span className="truncate">{userData.role}</span>
                            <span className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
                            <div className="flex items-center gap-1 text-neutral-400 truncate">
                                <IconBrandGithub className="w-4 h-4 shrink-0" />
                                <span className="text-sm truncate">@{userData.github}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 pt-4 flex justify-between items-end mt-4">
                    <div>
                        <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold mb-1">Fingerprint / Tag</p>
                        <p className={`font-mono ${isExport ? 'text-2xl' : 'text-xl'} text-white tracking-widest`}>
                            {userData.tag}
                        </p>
                    </div>
                    <div className="text-right">
                         <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold mb-1">Issue Date</p>
                         <p className="font-mono text-sm text-neutral-300">{userData.joinDate || "JAN 2024"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden font-sans">
        <div className="fixed inset-0 bg-[url('/Curves.png')] bg-cover bg-center opacity-5 pointer-events-none invert py-20" />
      <Navbar homeRef={homeRef} aboutRef={aboutRef} workRef={workRef} />

      {/* Hidden Export Container - Positioned offscreen */}
      <div 
        style={{ position: "fixed", top: 0, left: "-9999px", opacity: 0, pointerEvents: "none" }} 
        ref={exportRef}
      >
          <IdCardContent isExport={true} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl w-full text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black via-neutral-700 to-neutral-500">
            Digital Identity
          </h1>
          <p className="text-neutral-600 text-lg">
            Enter your unique tag to generate your official OSQ identification card.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg mb-12"
        >
            <div className="relative w-full">
                <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter Tag (e.g., OSQ-001)"
                    className="w-full px-6 py-4 rounded-xl bg-neutral-100 border border-neutral-200 text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30 transition-all text-lg"
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                />
            </div>
          
            <button
                onClick={handleVerify}
                disabled={status === "loading"}
                className="w-full md:w-auto px-8 py-4 rounded-xl bg-black text-white font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px] border border-transparent"
            >
                {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                <>
                    Verify <IconSearch className="w-5 h-5" />
                </>
                )}
            </button>
        </motion.div>

        {/* Error Message */}
        {status === "error" && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-[60%] flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-200"
            >
                <IconX className="w-5 h-5" />
                <span>Tag not found. Please check and try again.</span>
            </motion.div>
        )}

        {/* Success / Card Display */}
        <AnimatePresence>
            {status === "success" && userData && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="flex flex-col items-center gap-8 perspective-1000"
                >
                    <Tilt
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                        perspective={1000}
                        scale={1.02}
                        transitionSpeed={1000}
                        gyroscope={true}
                        glareEnable={true}
                        glareMaxOpacity={0.1}
                        glareColor="#ffffff"
                        glarePosition="all"
                        className="relative z-20"
                    >
                        <div className="w-[350px] md:w-[420px] aspect-[1.58] shadow-2xl rounded-[24px]">
                             <IdCardContent isExport={false} />
                        </div>
                    </Tilt>

                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={handleDownload}
                        className="px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        <IconDownload className="w-4 h-4" /> 
                        <span>Download High-Res Card</span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>

      </main>
    </div>
  );
}
