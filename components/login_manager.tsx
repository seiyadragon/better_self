import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router"
import Navigation from "./navigation";
import Link from "next/link";
import Footer from "./footer";

const LoginManager = () => {
    return (
        <main className="bg-gray-800">
            <Navigation />
            <section className="mx-4 md:mx-12 lg:mx-24 text-white text-center pt-5 pb-96">
                <p className="text-4xl py-16 my-16">{"Login to view this page."}</p>
                <Link 
                    href="/login" 
                    className="py-8 px-16 my-32 bg-gray-700 hover:bg-gray-600 self-center shadow-lg text-4xl text-orange-400"
                >
                    Login!
                </Link>
            </section>
            <Footer />
        </main>
    )
}; export default LoginManager