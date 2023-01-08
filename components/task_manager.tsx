import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, ChangeEvent, useEffect } from 'react'

const TEXT_AREA_PLACEHOLDER1 = `Use this box to write about yesterday, your dreams, goals, plans for the day, whatever you want. It's about you!`

type TaskManagerProps = {
    date: string,
}

const TaskManager = ({date}: TaskManagerProps) => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState(new Array<any>)
    const [isEdit, setIsEdit] = useState(false)

    const [textArea1, setTextArea1] = useState("")
    const [textAreaUpdated, setTextAreaUpdated] = useState(false)

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('UserRoutines').select().eq("userid", user?.id)

            let newData: Array<any> = []
            if (data)
                data.map((routine) => {
                    if (routine.date === date && routine.text !== "" ) {
                        newData.push(routine)
                    }
                })

            setData(newData)
        }

        if (user) 
            loadData()

        if (textAreaUpdated && data.length > 0) {
            setTextAreaUpdated(true)
            setTextArea1(data[0].text)
        }

    }, [user, data, isEdit, date, supabaseClient])

    if (isEdit)
        return (
            <section className="flex flex-col py-8 text-white text-base">
                <textarea 
                    className="bg-teal-600 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg placeholder-white" 
                    placeholder={TEXT_AREA_PLACEHOLDER1}
                    rows={16}
                    value={textArea1}
                    onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => setTextArea1(event.currentTarget.value)}
                />
                <section className="self-center flex">
                    <button 
                        className="py-8 my-16 mx-4 w-32 md:w-96 md:mx-16 bg-green-600 hover:bg-green-500 shadow-lg text-2xl" 
                        onClick={async () => {
                            if (!textArea1) {
                                alert("Please write something!")
                                return
                            }

                            setIsEdit(!isEdit)
                            const {error} = await supabaseClient.from("UserRoutines").delete().eq("date", date)

                            await supabaseClient.from("UserRoutines").insert({
                            userid: user !== null ? user.id : null,
                            text: textArea1,
                            date: date
                        })}}
                    >
                        Save!
                    </button>
                    <button 
                        className="py-8 my-16 w-32 mx-4 md:w-96 md:mx-16 bg-red-600 hover:bg-red-500 shadow-lg text-2xl" 
                        onClick={async () => setIsEdit(!isEdit)}
                    >
                        Cancel!
                    </button>
                </section>
            </section>
        )

    else {
        return (
            <section className="flex flex-col py-8 text-white">
                <p className="bg-teal-600 outline-none text-white resize-none my-4 px-4 py-4 shadow-lg h-96 overflow-y-scroll">
                    {data.length > 0 && data[0].text}
                    {data.length <= 0 && TEXT_AREA_PLACEHOLDER1}
                </p>
                <button 
                    className="py-8 my-16 w-64 mx-4 md:w-96 md:mx-16 bg-green-600 hover:bg-green-500 shadow-lg text-2xl self-center text-center" 
                    onClick={() => setIsEdit(!isEdit)}
                >
                    Edit!
                </button>
            </section>
        )
    }
}; export default TaskManager