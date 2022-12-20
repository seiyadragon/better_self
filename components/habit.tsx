import { useSupabaseClient } from "@supabase/auth-helpers-react";

type HabitProps = {
    name: string,
    days: number,
    id: number
}

const Habit = ({name, days, id}: HabitProps) => {
    let supabaseClient = useSupabaseClient()

    return (
        <section className="flex text-white my-4">
            <p className="bg-gray-700 w-36 py-16 text-center">{name}</p>
            <p className="bg-gray-700 w-36 py-16 ml-4 text-center">{days} days</p>
            <section className="ml-4 w-36">
                <button 
                    className="w-full h-1/3 bg-green-400 px-3 hover:scale-105 transition-transform"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: days + 1}).eq("id", id)}
                >
                    ▲
                </button>
                <button 
                    className="w-full h-1/3 bg-orange-400 px-3 hover:scale-105 transition-transform"
                    onClick={async () => await supabaseClient.from("UserHabits").update({days: 0}).eq("id", id)}
                >
                    •
                </button>
                <button 
                    className="w-full h-1/3 bg-red-400 px-3 hover:scale-105 transition-transform" 
                    onClick={async () => await supabaseClient.from("UserHabits").delete().eq("id", id)}
                >
                    X
                </button>
            </section>
        </section>
    )
}; export default Habit