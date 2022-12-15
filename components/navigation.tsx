import Image from 'next/image'
import Link from 'next/link';
import { FaCalendar } from 'react-icons/fa'

const HEADER_CLASS: string = "bg-gray-900 w-full flex text-orange-400 text-2xl sticky top-0 pt-1"
const BUTTON_CLASS: string = 'hover:scale-110 transition-transform delay-75 mx-2'
const IBUTTON_CLASS: string = `${BUTTON_CLASS} my-4`

export const Navigation = () => {
    return (
        <header className={HEADER_CLASS}>
            <Link href="/" className={BUTTON_CLASS}>
                <Image src="/logo.png" width={100} height={64} alt="Logo Image"/>
            </Link>
            <Link href="/calendar" className={IBUTTON_CLASS}>
                <FaCalendar/>
            </Link>
        </header>
    )
}; export default Navigation