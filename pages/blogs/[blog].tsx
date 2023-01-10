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
    }, [data, supabaseClient, blogID])

    return (
        <main className="bg-zinc-900">
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
            <ul className="md:mx-12 lg:mx-24 mx-6 min-h-screen text-white text-center text-2xl py-4 pb-16">
                {data.map((blog) => {
                    return (
                        <section className="py-12 bg-blue-900 my-8" key={blog}>
                            <p className="py-4 px-4 text-orange-400">
                                {blog.name}
                            </p>
                            {blog.body.map((paragraph: string) => {
                                return (
                                    <p className="py-2 px-4 text-left text-lg indent-16" key={paragraph}>
                                        {paragraph}
                                    </p>
                                )
                            })}
                        </section>
                    )
                })}
            </ul>
            <Footer />
        </main>
    )
}; export default Blog