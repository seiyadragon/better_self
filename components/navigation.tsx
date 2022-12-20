import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCalendar, FaHome, FaRedoAlt } from 'react-icons/fa'

const HEADER_CLASS: string = "bg-gray-900 opacity-90 w-full text-orange-400 text-2xl sticky top-0 pt-1 flex z-50"
const BUTTON_CLASS: string = 'hover:scale-150 transition-transform mx-2 my-4'

export const Navigation = () => {
    let user = useUser()
    let date = new Date()

    let [isWide, setWide] = useState(true)
    let [isMenuOpen, setMenuOpen] = useState(false)

    if (typeof window !== "undefined") {
        useEffect(() => {
            if (window.innerWidth <= 600) {
                setWide(false)
            } else {
                setWide(true)
            } 

            window.addEventListener("resize", (event) => {
                if (window.innerWidth <= 600) {
                    setWide(false)
                } else {
                    setWide(true)
                }
            })
        }, [isWide])
    }

    return (
        <header className={HEADER_CLASS}>
            <Image src="/logo.png" width={128} height={64} alt="Logo Image" style={{"maxHeight": "64px"}}/>
            {(isWide || isMenuOpen) && 
                <section 
                    className={
                        'flex ' + ((isMenuOpen && !isWide) ? 
                        'absolute top-16 left-10 flex-col bg-gray-900 opacity-90 px-16' : 
                        '')}
                >
                    <Link href="/" className={BUTTON_CLASS}>
                        <FaHome />
                    </Link>
                    <Link href={"/routines?date=" + date.toDateString().replaceAll(" ", "_")} className={BUTTON_CLASS}>
                        <FaRedoAlt/>
                    </Link>
                </section>
            }
            {!isWide &&
                <button className={BUTTON_CLASS} onClick={() => setMenuOpen(!isMenuOpen)}>▼</button>
            }
            <section className='w-full flex justify-end'>
                <Link href={user ? "/account" : "/login"} className="hover:underline my-2 mx-6">
                    {user ? user?.email : "Login"}
                </Link>
            </section>
        </header>
    )
}; export default Navigation