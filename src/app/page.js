'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger' 
import { useGSAP } from '@gsap/react'

import { Footer } from "./components"



export default function Home() {
    const heroSectionRef = useRef(null)
    const formSectionRef = useRef(null)
    const formRef = useRef(null)
    const [isFormVisible, setIsFormVisible] = useState(false)
    
    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
        const formSectionRefCurrent = formSectionRef.current
        const heroSectionRefCurrent = heroSectionRef.current
        const formRefCurrent = formRef.current

        

        if (isFormVisible) {
            // Animación inicial para subir el formulario
            gsap.fromTo(formSectionRefCurrent, 
                {
                    y: '100%',
                    // opacity: 0,
                    display: 'flex'
                },
                {
                    y: '0%',
                    // opacity: 1,
                    duration: 0.5,
                    ease: "slow(0.7,0.7,false)",
                }
            )
            const tl = gsap.timeline(formSectionRefCurrent,{
                scrollTrigger: {
                    trigger: formRefCurrent,
                    start: 'top center+=100%',
                    end: 'bottom center+=100%',
                    scrub: true,
                    markers: true
                }
            })
            tl.to(formRefCurrent, {
                y: '0%'               
            })
            tl.to(formRefCurrent, {
                width: '100%',
                height: '100%',
                duration: 1,
                scrub: true,
            })


        } else {
            // Animación para ocultar el formulario
            gsap.to(formSectionRefCurrent, {
                y: '100%',
                // opacity: 0,
                duration: 1,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(formSectionRefCurrent, { display: 'none' })
                }
            })
        }
    }, [isFormVisible]);

    const handleContactClick = () => {
        setIsFormVisible(true)
    }

    const handleContactClickClose = () => {
        setIsFormVisible(false)
    }

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen">
            <main className="flex flex-col row-start-2 items-center justify-center w-full overflow-hidden">
                <section 
                    ref={heroSectionRef}
                    className="flex flex-col justify-center items-center w-full h-screen bg-slate-400"
                >
                    <div className="flex justify-center items-center w-full">
                        <h2>Sección hero ejemplo</h2>
                    </div>
                    <button className="w-24 bg-black text-white rounded" onClick={handleContactClick}>Contáctanos</button>
                </section>
              
               
                    
                    {/* <button className='bg-black' onClick={handleContactClickClose}>Cerrar</button>
                    <h2>Sección formulario</h2> */}

                    <section 
                        ref={formSectionRef} 
                        className="absolute top-0 left-0 flex justify-center items-center w-[100%] h-[150vh] bg-transparent"
                    >   
                        <div 
                            ref={formRef}
                            className='w-[90%] flex justify-center items-center h-[110vh] bg-white rounded-xl'
                        >
                            <button className='bg-black' onClick={handleContactClickClose}>Cerrar</button>
                            <h2>Sección formulario</h2>
                        </div>
                    </section>
                
             
            </main>
            <Footer />
        </div>
    )
}
