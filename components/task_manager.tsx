import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, ChangeEvent, useEffect } from 'react'

type TaskManagerProps = {
    date: string,
}

const TaskManager = ({date}: TaskManagerProps) => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState(new Array<any>)
    const [isEdit, setIsEdit] = useState(false)

    const [textArea1, setTextArea1] = useState("")
    const [textArea2, setTextArea2] = useState("")
    const [textArea3, setTextArea3] = useState("")
    const [textArea4, setTextArea4] = useState("")
    const [textArea5, setTextArea5] = useState("")

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('UserRoutines').select().eq("userid", user?.id)

            let newData: Array<any> = []
            if (data)
                data.map((routine) => {
                    if (
                        routine.date === date 
                        && routine.textBoxes[0] !== "" 
                        && routine.textBoxes[1] !== "" 
                        && routine.textBoxes[2] !== ""
                        && routine.textBoxes[3] !== ""
                        && routine.textBoxes[4] !== ""
                    ) {
                        newData.push(routine)
                    }
                })

            setData(newData)
        }

        if (user) 
            loadData()

    }, [user, data, isEdit, date, supabaseClient])

    if (isEdit)
        return (
            <section className="flex flex-col py-8 text-white">
                <textarea 
                    className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg" 
                    placeholder="Use this box to write about yesterday, your dreams, goals, plans for the day, whatever you want. It's about you!"
                    rows={3}
                    value={textArea1}
                    onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => setTextArea1(event.currentTarget.value)}
                />
                <textarea 
                    className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg" 
                    placeholder="Use this box to write about your health, plan your meals, exercises you will do, etc..."
                    rows={3}
                    value={textArea2}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea2(event.currentTarget.value)}
                />
                <textarea 
                    className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg" 
                    placeholder="Use this box to write about any goals you want to accomplish, be it short or long term, or even just an idea, just write it down."
                    rows={3}
                    value={textArea3}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea3(event.currentTarget.value)}
                />
                <textarea 
                    className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg" 
                    placeholder="Use this box to write about any problems you are currently facing and how you will solve them. Don't just complain, but think."
                    rows={3}
                    value={textArea4}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea4(event.currentTarget.value)}
                />
                <textarea 
                    className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg" 
                    placeholder="Use this box to write about your accomplishments, things you're happy about. Forget being humble for your efforts must be celebrated."
                    rows={3}
                    value={textArea5}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextArea5(event.currentTarget.value)}
                />
                <button 
                    className="py-8 px-16 my-16 bg-gray-700 hover:bg-gray-600 shadow-lg text-2xl text-orange-400 self-center" 
                    onClick={async () => {
                        setIsEdit(!isEdit)
                        const {error} = await supabaseClient.from("UserRoutines").delete().eq("date", date)

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

    else {
        return (
            <section className="flex flex-col py-8 text-white">
                <p className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg h-24 overflow-y-scroll">
                    {data.length > 0 && data[0].textBoxes[0]}
                    {data.length <= 0 && "Use this box to write about yesterday, your dreams, goals, plans for the day, whatever you want. It's about you!"}
                </p>
                <p className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg h-24 overflow-y-scroll">
                    {data.length > 0 && data[0].textBoxes[1]}
                    {data.length <= 0 && "Use this box to write about your health, plan your meals, exercises you will do, etc..."}
                </p>
                <p className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg h-24 overflow-y-scroll">
                    {data.length > 0 && data[0].textBoxes[2]}
                    {data.length <= 0 && "Use this box to write about any goals you want to accomplish, be it short or long term, or even just an idea, just write it down."}
                </p>
                <p className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg h-24 overflow-y-scroll">
                    {data.length > 0 && data[0].textBoxes[3]}
                    {data.length <= 0 && "Use this box to write about any problems you are currently facing and how you will solve them. Don't just complain, but think."}
                </p>
                <p className="bg-gray-700 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg h-24 overflow-y-scroll">
                    {data.length > 0 && data[0].textBoxes[4]}
                    {data.length <= 0 && "Use this box to write about your accomplishments, things you're happy about. Forget being humble for your efforts must be celebrated."}
                </p>
                <button 
                    className="py-8 px-16 my-16 bg-gray-700 hover:bg-gray-600 shadow-lg text-2xl text-orange-400 self-center text-center" 
                    onClick={() => setIsEdit(!isEdit)}
                >
                    Edit!
                </button>
            </section>
        )
    }
}; export default TaskManager