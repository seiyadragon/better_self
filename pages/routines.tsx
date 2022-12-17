import { GetServerSideProps } from "next";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const getServerSideProps: GetServerSideProps = (context) => {
    let supabaseClient = useSupabaseClient()
    let data = supabaseClient.from("UserRoutines").select()

    return {
        props: {
            routineData: data
        }
    }
}

type RoutinesProps = {
    routineData: [any]
}

const Routines = ({routineData}: RoutinesProps) => {
    

    return (
        <main className="bg-gray-800">
            <Navigation />
            <ul className="mx-4 md:mx-12 lg:mx-24 text-center">
                <li></li>
            </ul>
            <Footer />
        </main>
    )
}; export default Routines