import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import LoginManager from "../components/login_manager";
import HeadManager from "../components/head_manager";
import {useEffect, useState} from 'react'
import BreadCrumbs from "../components/breadcrumbs";
import NavButton from "../components/nav_button";
import { FaBookOpen, FaClock, FaHome, FaSignOutAlt, FaTasks } from "react-icons/fa";
import TooltipButton from "../components/tooltip_button";

const Account = () => {
    let user = useUser()
    let supabaseClient = useSupabaseClient()
    
    let [dataLength, setDataLength] = useState(0)
    let [habitsLength, setHabitsLength] = useState(0)
    let [projectsLength, setProjectsLength] = useState(0)

    let date = new Date()

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('UserRoutines').select().eq("userid", user?.id)
            const { data: habits } = await supabaseClient.from('UserHabits').select().eq("userid", user?.id)
            const {data: projects} = await supabaseClient.from("UserProjects").select().eq("userid", user?.id)

            setDataLength(data?.length !== undefined ? data.length : 0)
            setHabitsLength(habits?.length !== undefined ? habits.length : 0)
            setProjectsLength(projects?.length !== undefined ? projects.length : 0)
        }

        if (user) 
            loadData()

    }, [user, dataLength, supabaseClient])

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
                <p className="py-8 text-4xl bg-blue-900 px-4 w-full rounded-xl border-b-4 border-blue-600 my-16">Welcome!</p>
                <section className="flex flex-wrap gap-14">
                    <section className="bg-blue-900 py-4 px-4 text-base md:w-96 w-full rounded-xl border-b-4 border-blue-600">
                        <p className="py-2 text-2xl">Stats</p>
                        <p className="py-2 px-2 text-left bg-blue-800 border-b-4 border-blue-600 rounded-xl my-4">Diary: {dataLength} days</p>
                        <p className="py-2 px-2 text-left bg-blue-800 border-b-4 border-blue-600 rounded-xl my-4">Habits: {habitsLength} habits</p>
                        <p className="py-2 px-2 text-left bg-blue-800 border-b-4 border-blue-600 rounded-xl my-4">Projects: {projectsLength} projects</p>
                    </section>
                    <section className="bg-blue-900 py-4 px-4 text-base md:w-96 w-full rounded-xl border-b-4 border-blue-600">
                        <p className="py-2 text-2xl">Control Panel</p>
                        <section className="flex flex-wrap w-fit h-fit text-6xl md:gap-x-4 gap-x-2">
                            <NavButton icon={<FaHome />} tooltip='Home' toolTipColor="bg-blue-900" href='/' />
                            <NavButton icon={<FaBookOpen />} tooltip='Diary' toolTipColor="bg-blue-900" href={"/diary?date=" + date.toDateString().replaceAll(" ", "_")} />
                            <NavButton icon={<FaClock />} tooltip='Habits' toolTipColor="bg-blue-900" href='/habits'/>
                            <NavButton icon={<FaTasks />} tooltip='Projects' toolTipColor="bg-blue-900" href='/projects'/>
                            <TooltipButton icon={<FaSignOutAlt />} tooltip="SignOut" toolTipColor="bg-blue-900" onClick={async (MouseEvent) => supabaseClient.auth.signOut()} />
                        </section>
                    </section>
                </section>
            </section>
            <Footer />
        </main>
    )
}; export default Account