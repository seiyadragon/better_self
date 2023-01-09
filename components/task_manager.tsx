import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, ChangeEvent, useEffect } from 'react'
import { FaBan, FaEdit, FaSave } from "react-icons/fa";

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
            
            if (!isEdit && textArea1 !== "")
                setTextArea1("")

            if (textArea1 === "" && newData.length !== 0)
                setTextArea1(newData[0].text)
        }

        if (user) 
            loadData()

    }, [user, data, isEdit, date, supabaseClient])

    if (isEdit)
        return (
            <section className="flex flex-col py-8 text-white text-base">
                <section className="bg-green-600 text-white text-xl py-4 mt-4 items-end">
                    <button className="px-4 transition-transform hover:scale-150" onClick={async () => {
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
                            })
                    }}><FaSave /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={async () => setIsEdit(!isEdit)}><FaBan /></button>
                </section>
                <textarea 
                    className="bg-green-600 outline-none text-white resize-none mb-4 px-4 py-4 shadow-lg h-96 placeholder-white" 
                    placeholder={TEXT_AREA_PLACEHOLDER1}
                    value={textArea1}
                    onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => setTextArea1(event.currentTarget.value)}
                />
            </section>
        )

    else {
        return (
            <section className="flex flex-col py-8 text-white">
                <section className="bg-blue-600 text-white text-xl py-4 mt-4 items-end">
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => setIsEdit(!isEdit)}><FaEdit /></button>
                </section>
                <p className="bg-blue-600 outline-none text-white resize-none mb-4 px-4 py-4 shadow-lg h-96"
                    dangerouslySetInnerHTML={{__html: `${data.length > 0 ? data[0].text : TEXT_AREA_PLACEHOLDER1}`}}
                >
                    
                </p>
            </section>
        )
    }
}; export default TaskManager