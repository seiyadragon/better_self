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
                    className="py-16 text-4xl text-orange-400 bg-gray-700 px-32 shadow-lg hover:bg-gray-600"
                >
                    Login!
                </Link>
            </section>
            <Footer />
        </main>
    )
}; export default LoginManager