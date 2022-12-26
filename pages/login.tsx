import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import { useRouter } from "next/router";
import Logo from "../components/logo";
import HeadManager from "../components/head_manager";
import BreadCrumbs from "../components/breadcrumbs";
import { useEffect } from "react";

const Login = () => {
    let supabaseClient = useSupabaseClient()
    let router = useRouter()
    let user = useUser()

    useEffect(() => {
        if (user)
            router.push(process.env.HOSTNAME !== undefined ? process.env.HOSTNAME : "")
    }, [user, router])

    return (
        <main className="min-h-screen absolute bg-gray-800 w-full">
            <HeadManager 
                title="Login"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals"
                description={`
                    Login or register a new account.
                `}
            />
            <Navigation />
            <BreadCrumbs breadCrumbs={[{name: "Home", href:"/"}, {name: "Login", href:"/login"}]} />
            <section className="px-4 md:px-12 lg:px-24 text-white">
                <Logo />
                <Auth
                    redirectTo="http://localhost:3000"
                    supabaseClient={supabaseClient}
                    appearance={{ theme: ThemeSupa }}
                    socialLayout="horizontal"
                />
            </section>
            <Footer />
        </main>
    )
}; export default Login