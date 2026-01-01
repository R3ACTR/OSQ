"use client"
import React, { useRef } from 'react'

interface Props {}

function VideoPlaying(props: Props) {
    const {} = props
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <section className='flex flex-col justify-center items-center md:mb-16 mb-6'>
           <img 
               src="https://camo.githubusercontent.com/f63e22ea6f6b43ec238a4cd59f987675b38bf101effcd153812b26d6b6829174/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f7375706572666f6c696f2f696d6167652f75706c6f61642f76313632303638393937392f36383734373437303733336132663266363932653730363936653639366436373265363336663664326636663732363936373639366536313663373332663633333632663333333332663633333232663633333633333333363333323330363536343635333833323636333036353330363336353634333736343335333733303634363236353333363133313636333332653637363936365f796a756832732e676966"
               alt="Decorative GIF"
               className='video w-full h-full object-cover cursor-pointer mb-8'
           />
        </section>
    )
}

export default VideoPlaying
