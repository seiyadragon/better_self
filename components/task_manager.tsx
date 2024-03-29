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
                if (shouldReset)
                    setTextArea1(newData[0].text)
            }
        }

        if (user) 
            loadData()

    }, [user, data, isEdit, date, supabaseClient, shouldReset, textArea1])

    const insertText = (tag1: string, tag2: string) => {
        let textBeforeSelection = textArea1.substring(0, selectionStart)
        let textSelected = textArea1.substring(selectionStart, selectionEnd)
        let textAfterSelection= textArea1.substring(selectionEnd, textArea1.length)

        setTextArea1(textBeforeSelection + tag1 + textSelected + tag2 + textAfterSelection)
    }

    if (isEdit)
        return (
            <section className="flex flex-col py-8 text-white text-base">
                <section className="bg-emerald-900 text-white text-xl py-4 mt-4 flex flex-wrap rounded-t-xl">
                    <TooltipButton icon={<FaSave />} tooltip="Save" toolTipColor="bg-emerald-900 top-3" onClick={async () => {
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

                            setShouldReset(true)
                    }} />
                    <TooltipButton icon={<FaBan />} tooltip="Cancel" toolTipColor="bg-emerald-900 top-3" onClick={() => {setIsEdit(!isEdit); setShouldReset(true)}}/>
                    <TooltipButton icon={<FaBold />} tooltip="Bold" toolTipColor="bg-emerald-900 top-3" onClick={() => insertText("<strong>", "</strong>")}/>
                    <TooltipButton icon={<FaItalic /> } tooltip="Italic" toolTipColor="bg-emerald-900 top-3" onClick={() => insertText("<i>", "</i>")}/>                
                    <TooltipButton icon={<FaHighlighter />} tooltip="Highlight" toolTipColor="bg-emerald-900 top-3" onClick={() => insertText("<mark>", "</mark>")}/>
                    <TooltipButton icon={<FaLink />} tooltip="Link" toolTipColor="bg-emerald-900 top-3" onClick={() => insertText("<a href=\"\">", "</a>")}/>
                    <TooltipButton icon={<FaListUl />} tooltip="List" toolTipColor="bg-emerald-900 top-3" onClick={() => insertText("<ul>", "</ul>")}/>
                    <TooltipButton icon={<FaDotCircle />} tooltip="ListItem" toolTipColor="bg-emerald-900 top-3" onClick={() => insertText("<li>", "</li>")}/>
                    <TooltipButton icon={<FaImage />} tooltip="TextFromImage" toolTipColor="bg-emerald-900 top-3" onClick={() => {
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
                    className="bg-emerald-900 outline-none text-white resize-none mb-4 px-4 py-4 shadow-lg h-96 placeholder-white rounded-b-xl border-b-4 border-emerald-600"
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
                            setShouldReset(false)
                    }}
                />
            </section>
        )

    else {
        return (
            <section className="flex flex-col py-8 text-white">
                <section className="bg-blue-900 text-white text-xl py-4 mt-4 flex rounded-t-xl">
                    <TooltipButton icon={<FaEdit />} tooltip="Edit" toolTipColor="bg-blue-900 top-3" onClick={() => {setIsEdit(!isEdit); setShouldReset(true)}}/>
                </section>
                <p className="diary bg-blue-900 outline-none text-white resize-none mb-4 px-4 py-4 shadow-lg overflow-y-hidden rounded-b-xl border-b-4 border-blue-600"
                    style={{"height": "600px"}}
                    dangerouslySetInnerHTML={{__html: `${data.length > 0 ? data[0].text : TEXT_AREA_PLACEHOLDER1}
                    <style>
                        .diary ul {
                            list-style-type: "→ ";
                            margin-left: 16px;
                            margin-right: 16px;
                        }
                        .diary mark {
                            padding-left: 2px;
                            padding-right: 4px;
                        }
                        .diary * {
                            margin-top: 12px;
                            margin-bottom: 12px;
                        }
                    </style>`}}
                />
            </section>
        )
    }
}; export default TaskManager