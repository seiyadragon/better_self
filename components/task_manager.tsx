import { logger } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, ChangeEvent, useEffect, KeyboardEvent, useRef } from 'react'
import { FaBan, FaBold, FaDotCircle, FaEdit, FaHighlighter, FaICursor, FaImage, FaItalic, FaLink, FaList, FaListUl, FaSave } from "react-icons/fa";
import {createWorker} from "tesseract.js"
import TooltipButton from "./tooltip_button";

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

    const [selectionStart, setSelectionStart] = useState(0)
    const [selectionEnd, setSelectionEnd] = useState(textArea1.length)

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

            if (textArea1 !== "" || !isEdit)
                setShouldReset(true)
                
            if (deleting)
                setShouldReset(false)
        }

        if (user) 
            loadData()

    }, [user, data, isEdit, date, supabaseClient])

    const insertText = (tag1: string, tag2: string) => {
        let textBeforeSelection = textArea1.substring(0, selectionStart)
        let textSelected = textArea1.substring(selectionStart, selectionEnd)
        let textAfterSelection= textArea1.substring(selectionEnd, textArea1.length)

        setTextArea1(textBeforeSelection + tag1 + textSelected + tag2 + textAfterSelection)
    }

    if (isEdit)
        return (
            <section className="flex flex-col py-8 text-white text-base">
                <section className="bg-emerald-900 text-white text-xl py-4 mt-4 flex flex-wrap">
                    <TooltipButton icon={<FaSave />} tooltip="Save" onClick={async () => {
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
                    }} />
                    <TooltipButton icon={<FaBan />} tooltip="Cancel" onClick={() => setIsEdit(!isEdit)}/>
                    <TooltipButton icon={<FaBold />} tooltip="Bold" onClick={() => insertText("<strong>", "</strong>")}/>
                    <TooltipButton icon={<FaItalic /> } tooltip="Italic" onClick={() => insertText("<i>", "</i>")}/>                
                    <TooltipButton icon={<FaHighlighter />} tooltip="Highlight" onClick={() => insertText("<mark>", "</mark>")}/>
                    <TooltipButton icon={<FaLink />} tooltip="Link" onClick={() => insertText("<a href=\"\">", "</a>")}/>
                    <TooltipButton icon={<FaListUl />} tooltip="List" onClick={() => insertText("<ul>", "</ul>")}/>
                    <TooltipButton icon={<FaDotCircle />} tooltip="List Item" onClick={() => insertText("<li>", "</li>")}/>
                    <TooltipButton icon={<FaImage />} tooltip="Text from Image" onClick={() => {
                        inputImageRef.current !== null ? inputImageRef.current.value = "" : {}
                        inputImageRef.current !== null ? inputImageRef.current.click() : {}
                    }}/>
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

                                console.log(event.target.files)
                                
                                let fileReader = new FileReader()

                                fileReader.onload = async (event) => {
                                    let dataURL: string | undefined = event.target?.result?.toString()
                                    
                                    const worker = await createWorker({
                                        logger: m => console.log(m)
                                    })

                                    await worker.loadLanguage("eng")
                                    await worker.initialize("eng")

                                    const {data: {text}} = await worker.recognize(dataURL !== undefined ? dataURL : "")

                                    await worker.terminate()

                                    if (text !== null && text !== "")
                                        insertText(text, "")
                                }

                                fileReader.readAsDataURL(file)
                            }
                        }}
                    />
                </section>
                <textarea
                    className="bg-emerald-900 outline-none text-white resize-none mb-4 px-4 py-4 shadow-lg h-96 placeholder-white"
                    style={{"height": "600px"}}
                    placeholder={TEXT_AREA_PLACEHOLDER1}
                    value={textArea1}
                    onMouseDown={(event) => {
                        setSelectionStart(event.currentTarget.selectionStart)
                        setSelectionEnd(event.currentTarget.selectionEnd)
                    }}
                    onMouseMove={(event) => {
                        setSelectionStart(event.currentTarget.selectionStart)
                        setSelectionEnd(event.currentTarget.selectionEnd)
                    }}
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
                <section className="bg-blue-900 text-white text-xl py-4 mt-4 flex">
                    <TooltipButton icon={<FaEdit />} tooltip="Edit" onClick={() => setIsEdit(!isEdit)}/>
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