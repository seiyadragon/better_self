import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleDown, FaBars, FaBookOpen, FaClock, FaHome, FaQuestion, FaTasks, FaUserCircle } from 'react-icons/fa'
import NavButton from './nav_button';

const SMALL_NAVBAR_PIX_SIZE = 680

export const Navigation = () => {
    let user = useUser()
    let date = new Date()

    let [isWide, setWide] = useState(true)
    let [isMenuOpen, setMenuOpen] = useState(false)
    let [isNavMenuHovering, setNavMenuHovering] = useState(false)

    if (typeof window !== "undefined") {
        window.addEventListener("resize", (event) => {
            if (window.innerWidth <= SMALL_NAVBAR_PIX_SIZE) {
                setWide(false)
            } else {
                setWide(true)
            }
        })

        window.addEventListener("click", () => {
            if (!isWide && isMenuOpen && !isNavMenuHovering)
                setMenuOpen(!isMenuOpen)
            else if (!isWide && !isMenuOpen && isNavMenuHovering)
                setMenuOpen(true)
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
                    <NavButton icon={<FaHome />} tooltip='Home' href='/' />
                    <NavButton icon={<FaBookOpen />} tooltip='Diary' href={"/diary?date=" + date.toDateString().replaceAll(" ", "_")} />
                    <NavButton icon={<FaClock />} tooltip='Habits' href='/habits'/>
                    <NavButton icon={<FaTasks />} tooltip='Projects' href='/projects'/>
                </section>
            }
            {!isWide &&
                <section className="hover:scale-150 transition-transform px-2 my-4">
                    <button onClick={() => setMenuOpen(!isMenuOpen)}
                        onMouseOver={() => {
                            setNavMenuHovering(true)
                        }}
                        onMouseLeave={() => {
                            setNavMenuHovering(false)
                        }}
                    >
                        <FaBars />
                    </button>
                    {isNavMenuHovering &&
                        <p className="absolute text-white text-xs bg-orange-400 py-2 px-4 my-2 rounded-full opacity-80 right-5">
                            {"Menu"}
                        </p>
                    }
                </section>
            }
            <section className='w-full flex justify-end'>
                <NavButton icon={<FaUserCircle />} tooltip='Account' href={user ? "/account" : "/login"} />
            </section>
        </header>
    )
}; export default Navigation