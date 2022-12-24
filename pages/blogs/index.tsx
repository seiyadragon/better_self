import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Footer from "../../components/footer";
import HeadManager from "../../components/head_manager";
import Navigation from "../../components/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import BreadCrumbs from "../../components/breadcrumbs";

const Blogs = () => {
    let supabaseClient = useSupabaseClient()
    let [data, setData] = useState(new Array<any>)

    useEffect(() => {
        async function load() {
            const { data } = await supabaseClient.from('Blogs').select()
            setData(data !== null ? data : new Array<any>)
        }

        load()
    }, [data])

    return (
        <main className="bg-gray-800">
            <HeadManager 
                title="View all the blogs"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals, Learn"
                description={`
                    View all the blogs on this site. They range in many subjects. Feel free to browse.
                `}
            />
            <Navigation />
            <BreadCrumbs breadCrumbs={[{name: "Home", href:"/"}, {name: "Blogs", href:"/blogs"}]} />
            <ul className="mx-4 md:mx-12 lg:mx-24 min-h-screen text-white text-center text-2xl py-4">
                {data.map((blog) => {
                    return (
                        <Link href={`/blogs/${blog.id}`}>
                            <p className="py-4 px-4 shadow-lg bg-gray-700 hover:scale-105 transition-transform">
                                {blog.name}
                            </p>
                        </Link>
                    )
                })}
            </ul>
            <Footer />
        </main>
    )
}; export default Blogs