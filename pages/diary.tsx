import { GetServerSideProps } from "next";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import TaskManager from "../components/task_manager";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import LoginManager from "../components/login_manager";
import HeadManager from "../components/head_manager";
import BreadCrumbs from "../components/breadcrumbs";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const dateSplit = ctx.query.date !== undefined ? ctx.query.date.toString().split("_") : new Array<string>
    const dateString = ctx.query.date !== undefined ? ctx.query.date.toString() : ""

    const date: RoutineDate = {
        weekDay: dateSplit[0],
        month: dateSplit[1],
        monthDay: dateSplit[2],
        year: dateSplit[3],
    }

    return {
        props: {
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
    date: RoutineDate,
    dateString: string
}

const Routines = ({date, dateString}: RoutinesProps) => {
    const dateDate = routineDateToDate(date)

    const prevDate = new Date(dateDate)
    prevDate.setDate(dateDate.getDate() - 1)

    const nextDate = new Date(dateDate)
    nextDate.setDate(dateDate.getDate() + 1)

    const user = useUser()

    const [isEdit, setIsEdit] = useState(false)

    if (!user)
        return <LoginManager />

    return (
        <main className="bg-zinc-900">
            <HeadManager 
                title="View your diary"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals"
                description={`
                    Write down and view all your daily activities. This will help you keep track of everything you do, 
                    where you are failing and where yo ucould improve.
                `}
            />
            <Navigation />
            <BreadCrumbs breadCrumbs={[{name: "Home", href:"/"}, {name: "Diary", href:"/diary"}]} />
            <section className="mx-4 md:mx-12 lg:mx-24 min-h-screen">
                <section className="mt-8 shadow-lg py-8 bg-blue-900 rounded-xl border-b-4 border-blue-600">
                    <section className="flex flex-row justify-center gap-12">
                        <Link 
                            className="text-orange-400 text-2xl hover:scale-150 transition-transform"
                            href={"/diary?date=" + prevDate.toDateString().replaceAll(" ", "_")}
                            onClick={() => setIsEdit(false)}
                        >
                            {"↤"}
                        </Link>
                        <p className="text-orange-400 text-2xl">{dateDate.toDateString()}</p>
                        <Link 
                            className="text-orange-400 text-2xl hover:scale-150 transition-transform"
                            href={"/diary?date=" + nextDate.toDateString().replaceAll(" ", "_")}
                            onClick={() => setIsEdit(false)}
                        >
                            {"↦"}
                        </Link>
                    </section>
                    <p className="text-white py-4 px-4">
                        {`
                            Track every single aspect of your life. In doing this you bring control and organization.
                            You gain the ability to look at your life from an objective angle, it allows you to detach emotion 
                            and yourself from the subject of your own life. Write everything down and read it afterwards, it will
                            help you remember. You can make full use of HTML and CSS to style your day!
                        `}
                    </p>
                </section>
                <TaskManager date={dateString} isEdit={isEdit} setIsEdit={setIsEdit}/>
            </section>
            <Footer />
        </main>
    )
}; export default Routines