import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image'
import Link from 'next/link';
import { FaCalendar, FaHome, FaRedoAlt } from 'react-icons/fa'

const HEADER_CLASS: string = "bg-gray-900 opacity-90 w-full text-orange-400 text-2xl sticky top-0 pt-1 flex z-50"
const BUTTON_CLASS: string = 'hover:scale-150 transition-transform mx-2 my-4'

export const Navigation = () => {
    let user = useUser()
    let date = new Date()

    return (
        <header className={HEADER_CLASS}>
            <Image src="/logo.png" width={128} height={64} alt="Logo Image" style={{"maxHeight": "64px"}}/>
            <Link href="/" className={BUTTON_CLASS}>
                <FaHome />
            </Link>
            <Link href={"/routines?date=" + date.toDateString().replaceAll(" ", "_")} className={BUTTON_CLASS}>
                <FaRedoAlt/>
            </Link>
            <section className='w-full flex justify-end'>
                <Link href={user ? "/account" : "/login"} className="hover:underline my-2 mx-6">
                    {user ? user?.email : "Login"}
                </Link>
            </section>
        </header>
    )
}; export default Navigation