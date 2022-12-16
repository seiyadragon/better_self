import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Footer from "./footer";

const LoginManager = () => {
    let user = useUser()
    let supabaseClient = useSupabaseClient()

    if (!user)
        return (
            <main className="h-screen absolute bg-gray-800 w-full">
                <section className="my-32 px-4 md:px-12 lg:px-24">
                    <Auth
                        redirectTo="http://localhost:3000/"
                        supabaseClient={supabaseClient}
                        appearance={{ theme: ThemeSupa }}
                        socialLayout="horizontal"
                    />
                </section>
                <Footer />
            </main>
        )
    
    return (
        <p>You are logged in!</p>
    )
}; export default LoginManager