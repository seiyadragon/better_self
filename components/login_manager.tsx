import Navigation from "./navigation";
import Link from "next/link";
import Footer from "./footer";
import NavButton from "./nav_button";
import { FaSignInAlt } from "react-icons/fa";

const LoginManager = () => {
    return (
        <main className="bg-gray-800">
            <Navigation />
            <section className="mx-4 md:mx-12 lg:mx-24 text-white pt-14">
                <p className="py-8 text-4xl bg-blue-900 px-4 w-full rounded-xl border-b-4 border-blue-600 my-16 text-center">Welcome!</p>
            </section>
            <section className="min-h-screen flex mx-4 md:mx-12 lg:mx-24 gap-12">
                <section className="text-white bg-blue-900 rounded-xl border-b-4 border-blue-700 my-8 text-xl py-4 px-4 w-96 h-96">
                    {
                        `
                            In order to use this app, an account is required, in order to save your data as well as show the data to the correct user.
                            Please take some time to register by clicking the link on the next card over. I appreciate any feedback you might want to
                            give me. If you wish to contact me regarding any questions or issues, feel free to conatct me on Twitter @arlenmolina101.
                        `
                    }
                </section>
                <section className="text-white bg-blue-900 rounded-xl border-b-4 border-blue-700 my-8 w-96 h-96 px-4">
                    <p className="text-xl py-4">{"Click the button below to Sign Up for free! Or Log In if you already have an account!"}</p>
                    <section className="flex text-8xl">
                        <section className="grid grid-cols-1 mx-auto">
                            <NavButton icon={<FaSignInAlt />} tooltip="Login" toolTipColor="bg-zinc-900" href="login" />
                        </section>
                    </section>
                </section>
            </section>
            <Footer />
        </main>
    )
}; export default LoginManager