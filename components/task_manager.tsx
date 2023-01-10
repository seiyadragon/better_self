import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, ChangeEvent, useEffect, KeyboardEvent, useRef } from 'react'
import { FaBan, FaBold, FaDotCircle, FaEdit, FaHighlighter, FaICursor, FaImage, FaItalic, FaLink, FaList, FaListUl, FaSave } from "react-icons/fa";

const TEXT_AREA_PLACEHOLDER1 = `Use this box to write about yesterday, your dreams, goals, plans for the day, whatever you want. It's about you!`

type TaskManagerProps = {
    date: string,
    isEdit: boolean,
    setIsEdit: any
}

const TaskManager = ({date, isEdit, setIsEdit}: TaskManagerProps) => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState(new Array<any>)

    const [textArea1, setTextArea1] = useState("")

    const [deleting, setDeleting] = useState(false)
    const [shouldReset, setShouldReset] = useState(true)

    const [selectionStart, setSelectionStart] = useState(textArea1.length)

    const inputImageRef = useRef<HTMLInputElement>(null)

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

            if (textArea1 === "" && newData.length !== 0) {
                if (!deleting && shouldReset)
                    setTextArea1(newData[0].text)
            }

            if (deleting)
                setShouldReset(false)

            if (textArea1 !== "" || !isEdit)
                setShouldReset(true)
        }

        if (user) 
            loadData()

    }, [user, data, isEdit, date, supabaseClient])

    const insertText = (text: string) => {
        let textBeforeCursorPosition = textArea1.substring(0, selectionStart)
        let textAfterCursorPosition = textArea1.substring(selectionStart, textArea1.length)

        setTextArea1(textBeforeCursorPosition + text + textAfterCursorPosition)
    }

    if (isEdit)
        return (
            <section className="flex flex-col py-8 text-white text-base">
                <section className="bg-emerald-900 text-white text-xl py-4 mt-4 items-end">
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
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => setIsEdit(!isEdit)}><FaBan /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => insertText("<strong></strong>")}><FaBold /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => insertText("<i></i>")}><FaItalic /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => insertText("<mark></mark>")}><FaHighlighter /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => insertText("<a href=\"\"></a>")}><FaLink /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => insertText("<ul></ul>")}><FaListUl /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => insertText("<li></li>")}><FaDotCircle /></button>
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => {
                        inputImageRef.current !== null ? inputImageRef.current.click() : {}
                    }}><FaImage /></button>
                    <input
                        ref={inputImageRef}
                        type="file" 
                        accept="image/*"
                        placeholder=""
                        style={{
                            "display": "none"
                        }}
                        onChange={(event) => {
                            if (event.target.files !== null) {
                                const file = event.target.files[0]
                                insertText(file.name)
                            }
                        }}
                    />
                </section>
                <textarea
                    className="bg-emerald-900 outline-none text-white resize-none mb-4 px-4 py-4 shadow-lg h-96 placeholder-white"
                    style={{"height": "600px"}}
                    placeholder={TEXT_AREA_PLACEHOLDER1}
                    value={textArea1}
                    onClick={(event) => setSelectionStart(event.currentTarget.selectionStart)}
                    onChange={async (event: ChangeEvent<HTMLTextAreaElement>) => {
                        setTextArea1(event.currentTarget.value)
                        setSelectionStart(event.currentTarget.selectionStart)
                    }}
                    onKeyDown={(event: KeyboardEvent) => {
                        if (event.key === "Backspace")
                            setDeleting(true)
                    }}
                    onKeyUp={(event: KeyboardEvent) => {
                        if (event.key === "Backspace")
                            setDeleting(false)
                    }}
                />
            </section>
        )

    else {
        return (
            <section className="flex flex-col py-8 text-white">
                <section className="bg-blue-900 text-white text-xl py-4 mt-4 items-end">
                    <button className="px-4 transition-transform hover:scale-150" onClick={() => setIsEdit(!isEdit)}><FaEdit /></button>
                </section>
                <p className="bg-blue-900 outline-none text-white resize-none mb-4 px-4 py-4 shadow-lg overflow-y-scroll"
                    style={{"height": "600px"}}
                    dangerouslySetInnerHTML={{__html: `${data.length > 0 ? data[0].text : TEXT_AREA_PLACEHOLDER1}
                    <style>
                        ul {
                            list-style-type: "→ ";
                            margin-left: 16px;
                            margin-right: 16px;
                        }
                    </style>`}}
                />
            </section>
        )
    }
}; export default TaskManager