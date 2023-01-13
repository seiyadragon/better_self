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
        <header className="bg-zinc-900 opacity-90 w-full text-orange-400 text-2xl sticky top-0 pt-1 flex z-50">
            <Image src="/logo.png" width={128} height={64} alt="Logo Image" style={{"maxHeight": "64px"}}/>
            {(isWide || isMenuOpen) && 
                <section 
                    className={
                        'flex ' + ((isMenuOpen && !isWide) ? 
                        'absolute top-16 left-10 flex-col bg-zinc-900 px-16' : 
                        '')}
                >
                    <NavButton icon={<FaHome />} tooltip='Home' toolTipColor="bg-zinc-900" href='/' />
                    <NavButton icon={<FaBookOpen />} tooltip='Diary' toolTipColor="bg-zinc-900" href={"/diary?date=" + date.toDateString().replaceAll(" ", "_")} />
                    <NavButton icon={<FaClock />} tooltip='Habits' toolTipColor="bg-zinc-900" href='/habits'/>
                    <NavButton icon={<FaTasks />} tooltip='Projects' toolTipColor="bg-zinc-900" href='/projects'/>
                </section>
            }
            {!isWide &&
                <TooltipButton icon={<FaBars />} tooltip="Menu" toolTipColor="bg-zinc-900" onClick={() => setMenuOpen(!isMenuOpen)}/>
            }
            <section className='w-full flex justify-end'>
                <NavButton icon={<FaUserCircle />} tooltip='Account' toolTipColor="bg-zinc-900" href={user ? "/account" : "/login"} />
            </section>
        </header>
    )
}; export default Navigation