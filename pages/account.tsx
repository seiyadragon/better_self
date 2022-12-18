import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import { useRouter } from "next/router";
import LoginManager from "../components/login_manager";


const Account = () => {
    let user = useUser()
    let supabaseClient = useSupabaseClient()

    if (!user)
        return <LoginManager/>

    return (
        <main className="bg-gray-800">
            <Navigation />
            <section className="mx-4 md:mx-12 lg:mx-24 text-center text-2xl text-white">
               <p className="py-4 text-4xl">Welcome!</p>
               <p className="py-2 text-left">ID: {user?.id}</p>
               <p className="py-2 text-left">Email: {user?.email}</p>
               <button 
                    className="py-8 px-16 my-32 bg-gray-700 hover:bg-gray-600 w-1/4 self-center shadow-lg text-2xl text-orange-400" 
                    onClick={async (MouseEvent) => supabaseClient.auth.signOut()}
                >
                    Sign Out!
                </button>
            </section>
            <Footer />
        </main>
    )
}; export default Account