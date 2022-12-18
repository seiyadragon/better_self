import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, ChangeEvent, useEffect } from 'react'

type TaskManagerProps = {
    date: string,
}

const TaskManager = ({date}: TaskManagerProps) => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState(new Array<any>)

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('UserRoutines').select()
            setData(data !== null ? data : new Array<any>)
        }

        if (user)
            loadData()
    }, [user])

    const [textArea1, setTextArea1] = useState(data.length > 0 ? data[0].textBoxes[0] : "")
    const [textArea2, setTextArea2] = useState(data.length > 0 ? data[0].textBoxes[0] : "")
    const [textArea3, setTextArea3] = useState(data.length > 0 ? data[0].textBoxes[0] : "")
    const [textArea4, setTextArea4] = useState(data.length > 0 ? data[0].textBoxes[0] : "")
    const [textArea5, setTextArea5] = useState(data.length > 0 ? data[0].textBoxes[0] : "")

    console.log(data)

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
                className="py-8 px-16 my-16 bg-gray-700 hover:bg-gray-600 w-1/4 shadow-lg text-2xl text-orange-400 self-center" 
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