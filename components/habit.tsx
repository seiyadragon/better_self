import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaArrowAltCircleUp, FaArrowUp, FaBan, FaRedo, FaRedoAlt } from "react-icons/fa";

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
        <section className="flex text-white my-4 text-base bg-blue-800 shadow-lg">
            <p className="bg-blue-600 w-24 h-36 py-4 px-4 text-center overflow-x-hidden shadow-lg">{finalName}</p>
            <p className="bg-blue-600 w-24 h-36 py-4 px-4 ml-4 text-center overflow-x-hidden shadow-lg">{days} days</p>
            <section className="ml-4 w-24 h-36 shadow-lg border-8 border-blue-600">
                <button 
                    className="w-full h-1/3 bg-green-600 px-3 hover:scale-105 transition-transform flex justify-center items-center border-4 border-blue-600"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: days + 1}).eq("id", id)}
                >
                    <FaArrowUp />
                </button>
                <button 
                    className="w-full h-1/3 bg-orange-600 px-3 hover:scale-105 transition-transform flex justify-center items-center border-4 border-blue-600"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: 0}).eq("id", id)}
                >
                    <FaRedoAlt />
                </button>
                <button 
                    className="w-full h-1/3 bg-red-600 px-3 hover:scale-105 transition-transform flex justify-center items-center border-4 border-blue-600" 
                    onClick={async () => await supabaseClient.from("UserHabits").delete().eq("id", id)}
                >
                    <FaBan/>
                </button>
            </section>
        </section>
    )
}; export default Habit