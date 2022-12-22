import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaArrowAltCircleUp, FaArrowUp, FaBan, FaRedo, FaRedoAlt } from "react-icons/fa";

type HabitProps = {
    name: string,
    days: number,
    id: number
}

const Habit = ({name, days, id}: HabitProps) => {
    let supabaseClient = useSupabaseClient()

    return (
        <section className="flex text-white my-4 text-lg">
            <p className="bg-gray-700 w-36 h-36 py-4 px-4 text-center">{name}</p>
            <p className="bg-gray-700 w-36 h-36 py-4 px-4 ml-4 text-center">{days} days</p>
            <section className="ml-4 w-36 h-36">
                <button 
                    className="w-full h-1/3 bg-green-400 px-3 hover:scale-105 transition-transform flex justify-center items-center"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: days + 1}).eq("id", id)}
                >
                    <FaArrowUp />
                </button>
                <button 
                    className="w-full h-1/3 bg-orange-400 px-3 hover:scale-105 transition-transform flex justify-center items-center"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: 0}).eq("id", id)}
                >
                    <FaRedoAlt />
                </button>
                <button 
                    className="w-full h-1/3 bg-red-400 px-3 hover:scale-105 transition-transform flex justify-center items-center" 
                    onClick={async () => await supabaseClient.from("UserHabits").delete().eq("id", id)}
                >
                    <FaBan/>
                </button>
            </section>
        </section>
    )
}; export default Habit