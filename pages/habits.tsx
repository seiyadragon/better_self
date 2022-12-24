import LoginManager from "../components/login_manager";
import Navigation from "../components/navigation";
import HeadManager from "../components/head_manager";
import Footer from "../components/footer";
import { FaPlusSquare } from "react-icons/fa";
import {useState, useEffect} from 'react'
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Habit from "../components/habit";
import BreadCrumbs from "../components/breadcrumbs";


const Habits = () => {
    let user = useUser()
    let supabaseClient = useSupabaseClient()

    let [data, setData] = useState(new Array<any>)
    let [inputValue, setInputValue] = useState("")

    useEffect(() => {
        async function load() {
            const { data } = await supabaseClient.from('UserHabits').select().eq("userid", user?.id)
            let sortedData = data?.sort((n1, n2) => n1.id - n2.id)

            setData(sortedData !== undefined ? sortedData : new Array<any>)
        }

        if (user)
            load()
    }, [user, data])

    if (!user)
        return <LoginManager />
    
    return (
        <main className="bg-gray-800">
            <HeadManager 
                title="View your routines"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals"
                description={`
                    Write down and view all your daily activities. This will help you keep track of everything you do, 
                    where you are failing and where yo ucould improve.
                `}
            />
            <Navigation />
            <BreadCrumbs breadCrumbs={[{name: "Home", href:"/"}, {name: "Habits", href:"/habits"}]} />
            <section className="mx-4 md:mx-12 lg:mx-24 min-h-screen">
                <section className="flex bg-gray-700 text-white my-8">
                    <input 
                        className="w-full bg-gray-700 outline-none px-2 text-lg"
                        placeholder="Type the name of your habit here!"
                        value={inputValue}
                        onChange={(event) => {
                            setInputValue(event.target.value)
                        }}
                    />
                    <button 
                        className="text-orange-400 text-4xl hover:scale-150 transition-transform" 
                        onClick={
                            async () => {
                                await supabaseClient.from("UserHabits").insert({
                                    userid: user?.id,
                                    name: inputValue,
                                    days: 0
                                })

                                setInputValue("")
                            }
                        }>
                        <FaPlusSquare />
                    </button>
                </section>
                <p className="text-white">
                    {`
                        Keep track of your habits here. Every day you do the habit, you count up one, but
                        if you fail, even one day, you have to reset it to 0.
                    `}
                </p>
                {data.map((habit) => {
                    return <Habit key={habit.id} name={habit.name} days={habit.days} id={habit.id}/>
                })}
            </section>
            <Footer />
        </main>
    )

}; export default Habits