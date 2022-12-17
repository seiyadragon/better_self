import { GetServerSideProps } from "next";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import { createClient } from "@supabase/supabase-js";
import TaskManager from "../components/task_manager";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const dateSplit = ctx.query.date !== undefined ? ctx.query.date.toString().split("_") : new Array<string>
    const dateString = ctx.query.date !== undefined ? ctx.query.date.toString() : ""

    const date: RoutineDate = {
        weekDay: dateSplit[0],
        month: dateSplit[1],
        monthDay: dateSplit[2],
        year: dateSplit[3],
    }

    let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined ? process.env.NEXT_PUBLIC_SUPABASE_URL : ""
    let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : ""
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    const {data, error} = await supabase.from("UserRoutines").select()

    return {
        props: {
            routineData: data,
            date: date,
            dateString: dateString
        }
    }
}

type RoutineDate = {
    weekDay: string,
    month: string,
    monthDay: string,
    year: string,

}

const routineDateToDate = (date: RoutineDate) => {
    return new Date(`${date.weekDay}-${date.month}-${date.monthDay}-${date.year}`)
}

type RoutinesProps = {
    routineData: [any],
    date: RoutineDate,
    dateString: string
}

const Routines = ({routineData, date, dateString}: RoutinesProps) => {
    const dateDate = routineDateToDate(date)

    const prevDate = new Date(dateDate)
    prevDate.setDate(dateDate.getDate() - 1)

    const nextDate = new Date(dateDate)
    nextDate.setDate(dateDate.getDate() + 1)

    const user = useUser()
    const router = useRouter()

    if (!user)
        router.push("/login")

    return (
        <main className="bg-gray-800">
            <Navigation />
            <section className="mx-4 md:mx-12 lg:mx-24">
                <section className="flex flex-row justify-center gap-12 mt-8">
                    <Link 
                        className="text-orange-400 text-2xl hover:scale-150 transition-transform"
                        href={"/routines?date=" + prevDate.toDateString().replaceAll(" ", "_")}
                    >
                        {"<"}
                    </Link>
                    <p className="text-orange-400 text-2xl border-b-2 border-orange-400">{dateDate.toDateString()}</p>
                    <Link 
                        className="text-orange-400 text-2xl hover:scale-150 transition-transform"
                        href={"/routines?date=" + nextDate.toDateString().replaceAll(" ", "_")}
                    >
                        {">"}
                    </Link>
                </section>
                <TaskManager date={dateString} routineData={routineData}/>
            </section>
            <Footer />
        </main>
    )
}; export default Routines