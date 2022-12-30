import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FaBan, FaCheck, FaPlus, FaPlusSquare } from "react-icons/fa";

type ProjectProps = {
    project: any
}

const Project = ({project}: ProjectProps) => {
    let [isOpen, setOpen] = useState(false)
    let [inputValue, setInputValue] = useState("")
    let supabaseClient = useSupabaseClient()

    return (
        <section>
            <section className="w-96 text-lg shadow-lg text-white bg-blue-600 flex">
                <button className={`hover:bg-blue-500 w-full px-4 py-4 shadow-lg text-left ${project.completed ? "line-through" : ""}`} onClick={() => setOpen(!isOpen)}>
                    {(project.name).toString().toUpperCase()}
                </button>
                <button className="hover:bg-blue-500 px-4 py-4 shadow-lg text-orange-400" onClick={
                    async () => {
                        await supabaseClient.from("UserProjects").delete().eq("id", project.id)
                    }
                }>
                    <FaBan />
                </button>
            </section>
            {isOpen && project.tasks !== null && project.tasks.map((task: any) => {
                return (
                    <section key={task.name} className={`text-white bg-blue-600 shadow-lg w-96 px-4 py-4 flex gap-4 ${task.completed ? "line-through" : ""}`}>
                        <input type="checkbox" checked={task.completed} onChange={async () => {
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
                        }}/>
                        <button className="hover:text-orange-400" onClick={
                            async (event) => {
                                let newTasks: Array<any> = []

                                project.tasks.map((task2: any) => {
                                    if (task.name !== task2.name)
                                        newTasks.push(task2)
                                })

                                project.tasks = newTasks

                                await supabaseClient.from("UserProjects").update(project).eq("id", project.id)
                            }
                        }>
                            <FaBan />
                        </button>
                        <p>{task.name}</p>
                    </section>
                )
            })}
            {isOpen &&
                <section className="text-black bg-blue-600 shadow-lg w-96 px-4 py-4 text-lg">
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