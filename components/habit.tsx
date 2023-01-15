import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaArrowAltCircleUp, FaArrowUp, FaBan, FaRedo, FaRedoAlt } from "react-icons/fa";
import TooltipButton from "./tooltip_button";

type HabitProps = {
    name: string,
    days: number,
    id: number
}

const Habit = ({name, days, id}: HabitProps) => {
    let supabaseClient = useSupabaseClient()

    let nameSplit = name.split(" ")
    let finalName = ""

    nameSplit.map((split) => {
        let sh1 = split.slice(0, split.length / 2)
        let sh2 = split.slice((split.length / 2), split.length)

        if (split.length >= 8)
            finalName = finalName.concat(" " + sh1 + "-" + sh2 + " ")

        else finalName = finalName.concat(" " + sh1 + sh2 + " ")
    })

    return (
        <section className="flex text-white my-4 text-base bg-blue-900 shadow-lg rounded-full">
            <p className="bg-blue-800 w-24 h-36 py-4 px-4 text-center overflow-x-hidden shadow-lg rounded-full">{finalName}</p>
            <p className="bg-blue-800 w-24 h-36 py-4 px-4 ml-4 text-center overflow-x-hidden shadow-lg rounded-full">{days} days</p>
            <section className="ml-4 w-24 h-36 shadow-lg bg-blue-800 py-6 rounded-full">
                <TooltipButton icon={<FaArrowUp />} tooltip="Increase" toolTipColor="bg-blue-900"
                    classOverride="hover:scale-150 transition-transform px-4 mx-6 h-1/3"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: days + 1}).eq("id", id)}
                />
                <TooltipButton icon={<FaRedoAlt />} tooltip="Reset" toolTipColor="bg-blue-900"
                    classOverride="hover:scale-150 transition-transform px-4 mx-6 h-1/3"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: 0}).eq("id", id)}
                />
                <TooltipButton icon={<FaBan/>} tooltip="Delete" toolTipColor="bg-blue-900"
                    classOverride="hover:scale-150 transition-transform px-4 mx-6 h-1/3"
                    onClick={async () => await supabaseClient.from("UserHabits").delete().eq("id", id)}
                />
            </section>
        </section>
    )
}; export default Habit