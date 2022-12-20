import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import { useRouter } from "next/router";
import Logo from "../components/logo";
import HeadManager from "../components/head_manager";

const Login = () => {
    let supabaseClient = useSupabaseClient()

    if (useUser()) {
        let router = useRouter()

        router.push("http://localhost:3000/")
    }

    return (
        <main className="h-screen absolute bg-gray-800 w-full">
            <HeadManager 
                title="Login"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals"
                description={`
                    Login or register a new account.
                `}
            />
            <Navigation />
            <section className="px-4 md:px-12 lg:px-24 text-white min-h-screen">
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