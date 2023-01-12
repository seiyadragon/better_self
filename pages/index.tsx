import { GetServerSideProps } from "next";
import Footer from "../components/footer";
import Logo from "../components/logo";
import Navigation from "../components/navigation";
import QuoteSection from "../components/quote_section";
import {Quote} from "../components/quote_section";
import HeadManager from "../components/head_manager";
import BreadCrumbs from "../components/breadcrumbs";
import { useEffect, useState } from "react";
import LoginManager from "../components/login_manager";
import LoginCall from "../components/login_call";

const SMALL_NAVBAR_PIX_SIZE = 680

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        var text = await (await fetch(process.env.HOSTNAME + "api/quote")).json()
        var quote: Quote = {
            author: text.Author,
            quote: text.Quote,
            id: text.id
        }

        console.log(text)
    } catch {
        var quote: Quote = {author: "Emory Andrew Tate II", quote: `
            My unmatched perspicacity coupled with
            my sheer indefatigability makes me a feared
            opponent in any realm of human endeavour.
        `, id: 0}
    }

    return {
        props: {
            quote: quote
        }
    }
}

type IndexProps = {
    quote: Quote
}

const Index = ({quote}: IndexProps) => {
    let [isWide, setWide] = useState(true)
    
    if (typeof window !== "undefined") {
        window.addEventListener("resize", (event) => {
            if (window.innerWidth <= SMALL_NAVBAR_PIX_SIZE) {
                setWide(false)
            } else {
                setWide(true)
            }
        })
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth <= SMALL_NAVBAR_PIX_SIZE) {
                setWide(false)
            } else {
                setWide(true)
            }
        }
    }, [isWide])

    return (
        <main className="bg-zinc-900" style={{
            "backgroundImage": isWide ? 
                "url(/home_background.jpg)" : 
                "url(/home_background_mobile.jpg)", 
            "backgroundSize": isWide ? 
                "cover" :
                "640px"
        }}>
            <HeadManager 
                title="The home of self improvement!"
                keywords="Journal, Self improvement, Learn new skills, Better yourself, Improve, Self++, Achieve Success, Achieve your goals"
                description={`
                    Welcome to the home of self improvement. Keep track of your daily activities, goals and many more. Learn all sorts of new skills,
                    with the courses we have avilable.
                `}
            />
            <section className="backdrop-blur-md">
                <Navigation />
                <BreadCrumbs breadCrumbs={[{name: "Home", href:"/"}]} />
                <section className="mx-4 md:mx-12 lg:mx-24 text-center">
                    <Logo />
                    <QuoteSection quote={quote} />
                </section>
                <section className="py-16">
                    <LoginCall />
                </section>
                <Footer />
            </section>
        </main>
    )
}; export default Index