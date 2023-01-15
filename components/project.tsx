import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FaBan, FaCheck, FaPlus, FaPlusSquare } from "react-icons/fa";
import TooltipButton from "./tooltip_button";

type ProjectProps = {
    project: any
}

const Project = ({project}: ProjectProps) => {
    let [isOpen, setOpen] = useState(false)
    let [inputValue, setInputValue] = useState("")
    let supabaseClient = useSupabaseClient()

    return (
        <section className="w-full lg:w-96">
            <section className="md:w-96 w-full text-lg shadow-lg text-white bg-blue-900 flex">
                <button className={`hover:bg-blue-800 w-full px-4 py-4 shadow-lg text-left ${project.completed ? "line-through" : ""}`} onClick={() => setOpen(!isOpen)}>
                    {(project.name).toString().toUpperCase()}
                </button>
                <TooltipButton icon={<FaBan />} tooltip="Remove" toolTipColor="bg-blue-900" onClick={
                    async () => {
                        await supabaseClient.from("UserProjects").delete().eq("id", project.id)
                    }
                }/>
            </section>
            {isOpen && project.tasks !== null && project.tasks.map((task: any) => {
                if (task.name.length > 35)
                    task.name = task.name.slice(0, 35).concat("...")


                return (
                    <section key={task.name} 
                        className={
                            `text-white shadow-lg md:w-96 w-full px-4 flex gap-1 h-16 border-b-2 border-blue-600 
                            ${task.completed ? "line-through bg-blue-700" : "bg-blue-900"}`
                        }>
                        <input type="checkbox" checked={task.completed} 
                            className="w-8 h-16 transition-transform hover:scale-150"
                            onChange={async () => {
                                task.completed = !task.completed
                                
                                let undoneTasks = false
                                project.tasks.map((task2: any) => {
                                    if (!task2.completed)
                                        undoneTasks = true
                                })

                                if (!undoneTasks)
                                    project.completed = true
                                else
                                    project.completed = false

                                await supabaseClient.from("UserProjects").update(project).eq("id", project.id)
                            }
                        }/>
                        <TooltipButton icon={<FaBan />} tooltip="Remove" toolTipColor="bg-blue-900" classOverride="hover:scale-150 transition-transform px-4 my-4 text-3xl translate-y-0.5"
                            onClick={
                                async (event) => {
                                    let newTasks: Array<any> = []

                                    project.tasks.map((task2: any) => {
                                        if (task.name !== task2.name)
                                            newTasks.push(task2)
                                    })

                                    project.tasks = newTasks

                                    await supabaseClient.from("UserProjects").update(project).eq("id", project.id)
                                }
                            }
                        />
                        <p className="translate-y-5">{task.name}</p>
                    </section>
                )
            })}
            {isOpen &&
                <section className="text-black bg-blue-900 shadow-lg md:w-96 w-full px-4 py-4 text-lg">
                    <section className="flex bg-white text-black">
                        <input 
                            className="w-full bg-white outline-none px-2 text-lg"
                            placeholder="Type the name of your task here!"
                            value={inputValue}
                            onChange={(event) => {
                                setInputValue(event.target.value)
                            }}
                        />
                        <button 
                            className="text-orange-600 text-2xl hover:text-orange-500 py-2 px-2" 
                            onClick={
                                async () => {
                                    project.tasks = project.tasks !== null ? project.tasks : new Array<any>
                                    project.tasks.push({name: inputValue, completed: false})

                                    await supabaseClient.from("UserProjects").update(project).eq("id", project.id)

                                    setInputValue("")
                                }
                            }>
                            <FaPlus />
                        </button>
                    </section>
                </section>
            }
        </section>
    )
}; export default Project