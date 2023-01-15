import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import Logo from "../components/logo";
import HeadManager from "../components/head_manager";
import BreadCrumbs from "../components/breadcrumbs";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
                    supabaseClient={supabaseClient}
                    socialLayout="horizontal"
                    appearance={{ 
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#E5883B',
                                    brandAccent: '#FC7A01',
                                    brandButtonText: 'black',
                                }
                            }
                        },
                        className: {
                            anchor: 'hover:bg-orange-500 py-2 bg-orange-400 my-2 shadow-lg',
                            button: 'hover:bg-orange-500 py-4 bg-orange-400 my-2 shadow-lg',
                            input: 'bg-white',
                        },
                        style: {
                            anchor: {color: 'black', borderRadius: '5px', fontSize: '14px'},
                            button: {fontSize: '18px'},
                            input: {backgroundColor: 'white'},
                            label: {color: '#E5883B', fontSize: '18px'}
                        }
                    }}
                />
            </section>
            <Footer />
        </main>
    )
}; export default Login