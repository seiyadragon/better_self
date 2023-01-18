import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {useState} from 'react'
import TooltipButton from './tooltip_button';
import { FaBan } from 'react-icons/fa';


type ProjectTaskProps = {
    project: any,
    task: any
}

const ProjectTask = ({project, task}: ProjectTaskProps) => {
    if (task.name.length > 30) {
        var newName = task.name.slice(0, 30)
        newName = newName.concat("...")
    }
    else 
        var newName = task.name

    let [isTaskHovered, setTaskHovered] = useState(false)
    let supabaseClient = useSupabaseClient()

    return (
        <section
            className={
                `text-white shadow-lg md:w-96 w-full px-4 flex gap-1 h-16 border-b-4 border-blue-600 rounded-2xl my-2
                ${task.completed ? "line-through bg-blue-500" : "bg-blue-800"}`
            }
            onMouseEnter={() => setTaskHovered(true)}
            onMouseLeave={() => setTaskHovered(false)}
        >
            <input type="checkbox" checked={task.completed} 
                className="w-8 h-16 transition-transform hover:scale-125"
                onChange={async () => {
                    task.completed = !task.completed
                    
                    let undoneTasks = false
                    project.tasks.map(async (task2: any) => {
                        if (!task2.completed)
                            undoneTasks = true
            
                        if (!undoneTasks)
                            project.completed = true
                        else
                            project.completed = false
                        await supabaseClient.from("UserProjects").update(project).eq("id", project.id)
                    })
                }
            }/>
            <TooltipButton icon={<FaBan />} tooltip="Remove" toolTipColor="bg-blue-900" classOverride="hover:scale-125 transition-transform px-4 my-4 text-3xl translate-y-0.5"
                onClick={
                    async (event) => {
                        let newTasks: Array<any> 
                        project.tasks.map(async (task2: any) => {
                            if (task.name !== task2.name)
                                newTasks.push(task2)
                
                            project.tasks = newTasks
                            await supabaseClient.from("UserProjects").update(project).eq("id", project.id)
                        })
                    }
                }
            />
            <p className="translate-y-5">{newName}</p>
            {isTaskHovered && task.name.length >= 30 &&
                <p className='absolute px-4 bg-blue-900 rounded-full py-2 left-96'>
                    {task.name}
                </p>
            }
        </section>
    )
}; export default ProjectTask