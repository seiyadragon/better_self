import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { FaArrowAltCircleDown, FaBars, FaBookOpen, FaClock, FaHome, FaQuestion, FaTasks, FaUserCircle } from 'react-icons/fa'
import NavButton from './nav_button';
import TooltipButton from './tooltip_button';

const SMALL_NAVBAR_PIX_SIZE = 680

export const Navigation = () => {
    let user = useUser()
    let date = new Date()

    let [isWide, setWide] = useState(true)
    let [isMenuOpen, setMenuOpen] = useState(false)

    if (typeof window !== "undefined") {
        window.addEventListener("resize", (event) => {
            if (window.innerWidth <= SMALL_NAVBAR_PIX_SIZE) {
                setWide(false)
            } else {
                setWide(true)
            }
        })
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth <= SMALL_NAVBAR_PIX_SIZE) {
                setWide(false)
            } else {
                setWide(true)
            }             
        }
    }, [isWide])

    return (
        <header className="bg-blue-900 opacity-90 w-full text-orange-400 text-2xl sticky top-0 pt-1 z-50 rounded-b-3xl border-b-4 border-blue-700">
            <section className='flex md:mx-20'>
                <Image src="/logo.png" width={112} height={64} alt="Logo Image" style={{"maxHeight": "64px"}}/>
                {isWide &&
                    <section className='flex justify-end md:w-full mx-2'>
                        <NavButton icon={<FaHome />} tooltip='Home' toolTipColor="bg-zinc-900" href='/' />
                        <NavButton icon={<FaBookOpen />} tooltip='Diary' toolTipColor="bg-zinc-900" href={"/diary?date=" + date.toDateString().replaceAll(" ", "_")} />
                        <NavButton icon={<FaClock />} tooltip='Habits' toolTipColor="bg-zinc-900" href='/habits'/>
                        <NavButton icon={<FaTasks />} tooltip='Projects' toolTipColor="bg-zinc-900" href='/projects'/>
                        <NavButton icon={<FaUserCircle />} tooltip='Account' toolTipColor="bg-zinc-900" href={user ? "/account" : "/login"} />
                    </section>
                }
                {!isWide &&
                    <section className='flex w-full justify-end'>
                        <TooltipButton icon={<FaBars />} tooltip="Menu" toolTipColor="bg-zinc-900" onClick={() => setMenuOpen(!isMenuOpen)}/>
                    </section>
                }
                {!isWide && isMenuOpen &&
                    <section className='absolute flex flex-col md:w-full mx-2 top-24 right-0 bg-blue-900 pr-2 mr-0 px-2 py-4 rounded-l-xl border-l-4 border-blue-700'>
                        <NavButton icon={<FaHome />} tooltip='Home' toolTipColor="bg-zinc-900" href='/' />
                        <NavButton icon={<FaBookOpen />} tooltip='Diary' toolTipColor="bg-zinc-900" href={"/diary?date=" + date.toDateString().replaceAll(" ", "_")} />
                        <NavButton icon={<FaClock />} tooltip='Habits' toolTipColor="bg-zinc-900" href='/habits'/>
                        <NavButton icon={<FaTasks />} tooltip='Projects' toolTipColor="bg-zinc-900" href='/projects'/>
                        <NavButton icon={<FaUserCircle />} tooltip='Account' toolTipColor="bg-zinc-900" href={user ? "/account" : "/login"} />
                    </section>
                }
            </section>
        </header>
    )
}; export default Navigation