import Link from "next/link";
import NavButton from "./nav_button";
import { FaBookOpen, FaClock, FaHome, FaSignInAlt, FaSignOutAlt, FaTasks, FaUserCircle } from "react-icons/fa";
import { useUser } from "@supabase/auth-helpers-react";
import TooltipButton from "./tooltip_button";

const LoginCall = () => {
    let user = useUser()
    let date = new Date()

    return (
        <section className="mx-4 md:mx-12 lg:mx-24 text-white text-center bg-blue-900 rounded-xl border-b-4 border-blue-700 opacity-80">
            {!user && 
                <section>
                    <p className="text-base py-8">{"Click the button below to Sign Up for free! Or Log In if you already have an account!"}</p>
                    <section className="flex text-8xl">
                        <section className="grid grid-cols-1 mx-auto">
                            <NavButton icon={<FaSignInAlt />} tooltip="Login" toolTipColor="bg-blue-900" href="login" />
                        </section>
                    </section>
                </section>
            }
            {user && 
                <section className="px-4">
                    <p className="py-2 text-6xl">Welcome!</p>
                    <section className="flex flex-wrap w-fit h-fit text-6xl md:gap-x-4 gap-x-2 mx-auto">
                        <NavButton icon={<FaHome />} tooltip='Home' toolTipColor="bg-blue-900" href='/' />
                        <NavButton icon={<FaBookOpen />} tooltip='Diary' toolTipColor="bg-blue-900" href={"/diary?date=" + date.toDateString().replaceAll(" ", "_")} />
                        <NavButton icon={<FaClock />} tooltip='Habits' toolTipColor="bg-blue-900" href='/habits'/>
                        <NavButton icon={<FaTasks />} tooltip='Projects' toolTipColor="bg-blue-900" href='/projects'/>
                        <NavButton icon={<FaUserCircle />} tooltip='Account' toolTipColor="bg-blue-900" href='/account'/>
                    </section>
                </section>
            }
        </section>
    )
}; export default LoginCall