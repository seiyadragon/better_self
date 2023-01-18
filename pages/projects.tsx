import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import BreadCrumbs from "../components/breadcrumbs";
import HeadManager from "../components/head_manager";
import Navigation from "../components/navigation";
import {useState, useEffect} from 'react'
import LoginManager from "../components/login_manager";
import { FaPlus, FaPlusSquare } from "react-icons/fa";
import Project from "../components/project";
import TooltipButton from "../components/tooltip_button";


const Projects = () => {
    let user = useUser()
    let supabaseClient = useSupabaseClient()

    let [data, setData] = useState(new Array<any>)
    let [inputValue, setInputValue] = useState("")

    useEffect(() => {
        async function load() {
            const { data } = await supabaseClient.from('UserProjects').select().eq("userid", user?.id)
            let sortedData = data?.sort((n1, n2) => n1.id - n2.id)

            setData(sortedData !== undefined ? sortedData : new Array<any>)
        }

        if (user)
            load()
    }, [user, data, supabaseClient])

    if (!user)
        return <LoginManager />

    return (
        <main className="bg-zinc-900">
            <HeadManager
                title="View your habits"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals"
                description={`
                    Keep track of all your projects, defined projects and different tasks associated with them.
                `}
            />
            <Navigation />
            <BreadCrumbs breadCrumbs={[{name: "Home", href:"/"}, {name: "Projects", href:"/projects"}]} />
            <section className="mx-4 md:mx-12 lg:mx-24 min-h-screen">
                <section className="mt-8 shadow-lg py-2 bg-blue-900 rounded-xl border-b-4 border-blue-600 pb-9">
                    <section className="flex bg-gray-700 text-white my-8">
                        <input 
                            className="w-full bg-gray-700 outline-none px-4 text-lg"
                            placeholder="Type the name of your project here!"
                            value={inputValue}
                            onChange={(event) => {
                                setInputValue(event.target.value)
                            }}
                        />
                        <TooltipButton icon={<FaPlus />} tooltip="Add" toolTipColor="bg-blue-900" classOverride="hover:scale-125 transition-transform px-4 my-1 text-3xl translate-y-1 text-orange-600"
                            onClick={
                                async () => {
                                    await supabaseClient.from("UserProjects").insert({
                                        userid: user?.id,
                                        name: inputValue,
                                    })

                                    setInputValue("")
                                }
                            }
                        />
                    </section>
                    <p className="text-white px-4">
                        {`You can use this section to define projects, routines, or tasks or really anything that can be broken down into smaller tasks.`}
                    </p>
                </section>
                <section className="flex flex-wrap gap-8 mt-10">
                    {data.map((project) => {
                        return <Project key={project.name} project={project} />
                    })}
                </section>
            </section>
        </main>
    )
}; export default Projects