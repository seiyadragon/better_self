import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, ChangeEvent, useEffect } from 'react'

type TaskManagerProps = {
    date: string,
    routineData: [any]
}

const TaskManager = ({date, routineData}: TaskManagerProps) => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()

    console.log(date)

    let currentRoutine: any = null

    routineData.map((data) => {
        if (data.date === date) {
            currentRoutine = data
        }
    })

    const [textArea1, setTextArea1] = useState("")
    const [textArea2, setTextArea2] = useState("")
    const [textArea3, setTextArea3] = useState("")
    const [textArea4, setTextArea4] = useState("")
    const [textArea5, setTextArea5] = useState("")

    useEffect(() => {
        if (currentRoutine !== null) {
            setTextArea1(currentRoutine.textBoxes[0])
            setTextArea2(currentRoutine.textBoxes[1])
            setTextArea3(currentRoutine.textBoxes[2])
            setTextArea4(currentRoutine.textBoxes[3])
            setTextArea5(currentRoutine.textBoxes[4])
        }
    })

    return (
        <section className="flex flex-col py-8 text-white">
            <textarea 
                className="bg-gray-700 outline-none text-white text-lg resize-none my-4 px-4 py-4 shadow-lg" 
                placeholder="Use this box to write about yesterday, your dreams, goals, plans for the day, whatever you want. It's about you!"
                rows={3}
                value={textArea1}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea1(event.currentTarget.value)}
            />
            <textarea 
                className="bg-gray-700 outline-none text-white text-lg resize-none my-4 px-4 py-4 shadow-lg" 
                placeholder="Use this box to write about your health, plan your meals, exercises you will do, etc..."
                rows={3}
                value={textArea2}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea2(event.currentTarget.value)}
            />
            <textarea 
                className="bg-gray-700 outline-none text-white text-lg resize-none my-4 px-4 py-4 shadow-lg" 
                placeholder="Use this box to write about any goals you want to accomplish, be it short or long term, or even just an idea, just write it down."
                rows={3}
                value={textArea3}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea3(event.currentTarget.value)}
            />
            <textarea 
                className="bg-gray-700 outline-none text-white text-lg resize-none my-4 px-4 py-4 shadow-lg" 
                placeholder="Use this box to write about any problems you are currently facing and how you will solve them. Don't just complain, but think."
                rows={3}
                value={textArea4}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea4(event.currentTarget.value)}
            />
            <textarea 
                className="bg-gray-700 outline-none text-white text-lg resize-none my-4 px-4 py-4 shadow-lg" 
                placeholder="Use this box to write about your accomplishments, things you're happy about. Forget being humble for your efforts must be celebrated."
                rows={3}
                value={textArea5}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea5(event.currentTarget.value)}
            />
            <button 
                className="py-8 px-16 my-16 bg-gray-600 hover:bg-gray-400 w-1/4 shadow-lg text-2xl text-orange-400 self-center" 
                onClick={async () => {
                    await supabaseClient.from("UserRoutines").insert({
                    userid: user !== null ? user.id : null,
                    textBoxes: [
                        textArea1,
                        textArea2,
                        textArea3,
                        textArea4,
                        textArea5
                    ],
                    date: date
                })}}
            >
                Save!
            </button>
        </section>
    )
}; export default TaskManager