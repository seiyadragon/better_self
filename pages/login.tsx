import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import Logo from "../components/logo";
import HeadManager from "../components/head_manager";
import BreadCrumbs from "../components/breadcrumbs";

const Login = () => {
    let supabaseClient = useSupabaseClient()

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
                    redirectTo={process.env.HOSTNAME + ""}
                    supabaseClient={supabaseClient}
                    appearance={{ theme: ThemeSupa }}
                    socialLayout="horizontal"
                />
            </section>
            <Footer />
        </main>
    )
}; export default Login