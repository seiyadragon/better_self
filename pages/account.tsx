import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import LoginManager from "../components/login_manager";
import HeadManager from "../components/head_manager";
import {useEffect, useState} from 'react'
import BreadCrumbs from "../components/breadcrumbs";

const Account = () => {
    let user = useUser()
    let supabaseClient = useSupabaseClient()
    
    let [dataLength, setDataLength] = useState(0)
    let [habitsLength, setHabitsLength] = useState(0)

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('UserRoutines').select().eq("userid", user?.id)
            const { data: habits } = await supabaseClient.from('UserHabits').select().eq("userid", user?.id)

            setDataLength(data?.length !== undefined ? data.length : 0)
            setHabitsLength(habits?.length !== undefined ? habits.length : 0)
        }

        if (user) 
            loadData()

    }, [user, dataLength])

    if (!user)
        return <LoginManager/>

    return (
        <main className="bg-gray-800">
            <HeadManager 
                title="Manage your account"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals"
                description={`
                    Manage your account here. View all your details, and update your information when necessary.
                `}
            />
            <Navigation />
            <BreadCrumbs breadCrumbs={[{name: "Home", href:"/"}, {name: "Account", href:"/account"}]} />
            <section className="mx-4 md:mx-12 lg:mx-24 text-center text-2xl text-white min-h-screen">
               <p className="py-4 text-4xl">Welcome!</p>
               <p className="py-2 text-left">ID: {user?.id}</p>
               <p className="py-2 text-left">Email: {user?.email}</p>
               <p className="py-2 text-left">Diary: {dataLength} days</p>
               <p className="py-2 text-left">Habits: {habitsLength} habits</p>
               <button 
                    className="py-8 px-16 my-32 bg-gray-700 hover:bg-gray-600 self-center shadow-lg text-2xl text-orange-400" 
                    onClick={async (MouseEvent) => supabaseClient.auth.signOut()}
                >
                    Sign Out!
                </button>
            </section>
            <Footer />
        </main>
    )
}; export default Account