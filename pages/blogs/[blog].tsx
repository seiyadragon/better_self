import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next";
import {useState, useEffect} from 'react';
import HeadManager from "../../components/head_manager";
import Navigation from "../../components/navigation";
import Link from "next/link";
import Footer from "../../components/footer";
import BreadCrumbs from "../../components/breadcrumbs";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            blogID: context.query.blog
        }
    }
}

type BlogProps = {
    blogID: number
}

const Blog = ({blogID}: BlogProps) => {
    let supabaseClient = useSupabaseClient()
    let [data, setData] = useState(new Array<any>)

    useEffect(() => {
        async function load() {
            const { data } = await supabaseClient.from('Blogs').select().eq("id", blogID)
            setData(data !== null ? data : new Array<any>)
        }

        load()
    }, [data])

    return (
        <main className="bg-gray-800">
            <HeadManager 
                title="View all the blogs"
                keywords={data.length > 0 ? data[0].keywords : "Not found"}
                description={`
                    View all the blogs on this site. They range in many subjects. Feel free to browse.
                `}
            />
            <Navigation />
            <BreadCrumbs breadCrumbs={
                [
                    {name: "Home", href:"/"}, 
                    {name: "Blogs", href:"/blogs"},
                    {name: data.length > 0 ? data[0].name : "Not found", href:"/blogs/" + blogID}
                ]
            } />
            <ul className="mx-4 md:mx-12 lg:mx-24 min-h-screen text-white text-center text-2xl py-4">
                {data.map((blog) => {
                    return (
                        <section>
                            <p className="py-4 px-4 shadow-lg bg-gray-700">
                                {blog.name}
                            </p>
                            <p className="py-4 px-4 shadow-lg bg-gray-700 text-left text-lg">
                                {blog.body}
                            </p>
                        </section>
                    )
                })}
            </ul>
            <Footer />
        </main>
    )
}; export default Blog