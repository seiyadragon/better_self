import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleDown, FaBookOpen, FaClock, FaHome, FaQuestion } from 'react-icons/fa'

const HEADER_CLASS: string = "bg-gray-900 opacity-90 w-full text-orange-400 text-2xl sticky top-0 pt-1 flex z-50"
const BUTTON_CLASS: string = 'hover:scale-150 transition-transform mx-2 my-4'

const SMALL_NAVBAR_PIX_SIZE = 680

export const Navigation = () => {
    let user = useUser()
    let date = new Date()

    let [isWide, setWide] = useState(true)
    let [isMenuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
            if (typeof window !== "undefined") {
            if (window.innerWidth <= SMALL_NAVBAR_PIX_SIZE) {
                setWide(false)
            } else {
                setWide(true)
            } 

            window.addEventListener("resize", (event) => {
                if (window.innerWidth <= SMALL_NAVBAR_PIX_SIZE) {
                    setWide(false)
                } else {
                    setWide(true)
                }
            })
        }
    }, [isWide])

    return (
        <header className={HEADER_CLASS}>
            <Image src="/logo.png" width={128} height={64} alt="Logo Image" style={{"maxHeight": "64px"}}/>
            {(isWide || isMenuOpen) && 
                <section 
                    className={
                        'flex ' + ((isMenuOpen && !isWide) ? 
                        'absolute top-16 left-10 flex-col bg-gray-900 px-16' : 
                        '')}
                >
                    <Link href="/" className={BUTTON_CLASS}>
                        <FaHome />
                    </Link>
                    <Link href={"/diary?date=" + date.toDateString().replaceAll(" ", "_")} className={BUTTON_CLASS}>
                        <FaBookOpen />
                    </Link>
                    <Link href={"/habits"} className={BUTTON_CLASS}>
                        <FaClock />
                    </Link>
                    <Link href={"/blogs"} className={BUTTON_CLASS}>
                        <FaQuestion />
                    </Link>
                </section>
            }
            {!isWide &&
                <button className={BUTTON_CLASS} onClick={() => setMenuOpen(!isMenuOpen)}>
                    <FaArrowAltCircleDown />
                </button>
            }
            <section className='w-full flex justify-end'>
                <Link href={user ? "/account" : "/login"} className="hover:underline my-2 mx-6">
                    {user ? user?.email : "Login"}
                </Link>
            </section>
        </header>
    )
}; export default Navigation