import Image from 'next/image'
import Link from 'next/link';
import { FaCalendar, FaRedoAlt } from 'react-icons/fa'

const HEADER_CLASS: string = "bg-gray-900 opacity-90 w-full text-orange-400 text-2xl sticky top-0 pt-1 flex"
const BUTTON_CLASS: string = 'hover:scale-150 transition-transform mx-2'
const IBUTTON_CLASS: string = `${BUTTON_CLASS} my-4`

export const Navigation = () => {
    return (
        <header className={HEADER_CLASS}>
            <Link href="/" className={BUTTON_CLASS}>
                <Image src="/logo.png" width={100} height={64} alt="Logo Image"/>
            </Link>
            <Link href="/routines" className={IBUTTON_CLASS}>
                <FaRedoAlt/>
            </Link>
        </header>
    )
}; export default Navigation