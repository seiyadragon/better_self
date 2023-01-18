import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FaBan, FaCheck, FaPlus, FaPlusSquare } from "react-icons/fa";
import TooltipButton from "./tooltip_button";
import ProjectTask from "./project_task";

type ProjectProps = {
    project: any
}

const Project = ({project}: ProjectProps) => {
    let [isOpen, setOpen] = useState(false)
    let [inputValue, setInputValue] = useState("")
    let supabaseClient = useSupabaseClient()

    return (
        <section className={"w-full lg:w-96 rounded-t-xl" + ` ${isOpen ? "" : ""}`}>
            <section className={"shadow-lg rounded-t-xl" + ` ${!isOpen ? "rounded-b-xl" : ""} ${project.completed ? "bg-blue-400 hover:bg-blue-300" : "bg-blue-900 hover:bg-blue-800"}`}>
                <section className="md:w-96 w-full text-lg text-white  flex rounded-t-xl h-16"
                    onClick={() => setOpen(!isOpen)}
                >
                    <p className={`w-full px-4 py-4 text-left ${project.completed ? "line-through" : ""}`} >
                        {(project.name).toString().toUpperCase()}
                    </p>
                    <TooltipButton icon={<FaBan />} tooltip="Remove" toolTipColor="bg-blue-900" onClick={
                        async () => {
                            await supabaseClient.from("UserProjects").delete().eq("id", project.id)
                        }
                    }/>
                </section>
                {!isOpen &&
                    <section className="md:w-96 w-full text-lg shadow-xl text-white flex rounded-b-xl h-16 border-b-4 border-blue-600"
                        onClick={() => setOpen(!isOpen)}
                    >
                    </section>
                }
            </section>
            { isOpen && 
                <section className={"py-2" + ` ${project.completed ? "bg-blue-400" : "bg-blue-900"}`}>
                    {project.tasks !== null && project.tasks.map((task: any) => {
                        return <ProjectTask key={project.name + task.name} project={project} task={task} />
                    })}
                </section>
            }
            {isOpen &&
                <section className={"text-black md:w-96 w-full py-4 text-lg" + ` ${project.completed ? "bg-blue-400" : "bg-blue-900"}`}>
                    <section className="flex bg-white text-black">
                        <input 
                            className="w-full bg-white outline-none px-4 text-lg rounded-xl"
                            placeholder="Type the name of your task here!"
                            value={inputValue}
                            onChange={(event) => {
                                setInputValue(event.target.value)
                            }}
                        />
                        <TooltipButton icon={<FaPlus />} tooltip="Add" toolTipColor="bg-blue-900" classOverride="hover:scale-125 transition-transform px-4 my-1 text-3xl translate-y-1 text-orange-600"
                            onClick={
                                async () => {
                                    project.tasks = project.tasks !== null ? project.tasks : new Array<any>
                                    project.tasks.push({name: inputValue, completed: false})

                                    await supabaseClient.from("UserProjects").update(project).eq("id", project.id)

                                    setInputValue("")
                                }
                            }
                        />
                    </section>
                </section>
            }
            {isOpen &&
                <section className={"md:w-96 w-full text-lg shadow-xl text-white flex rounded-b-xl h-16 border-b-4 border-blue-600" + ` ${project.completed ? "bg-blue-400" : "bg-blue-900"}`}>
                </section>
            }
        </section>
    )
}; export default Project