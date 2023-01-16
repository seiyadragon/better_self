import Link from "next/link";
import NavButton from "./nav_button";
import { FaSignInAlt } from "react-icons/fa";

const LoginCall = () => {
    return (
        <section className="mx-4 md:mx-12 lg:mx-24 text-white text-center bg-blue-900 rounded-xl border-b-4 border-blue-700">
            <p className="text-2xl py-8">{"Click the button below to Sign Up for free! Or Log In if you already have an account!"}</p>
            <section className="flex text-8xl">
                <section className="grid grid-cols-1 mx-auto">
                    <NavButton icon={<FaSignInAlt />} tooltip="Login" toolTipColor="bg-blue-900" href="login" />
                </section>
            </section>
        </section>
    )
}; export default LoginCall