import { GetServerSideProps } from "next";
import Navigation from "../components/navigation";
import QuoteSection from "../components/quote_section";
import {Quote} from "../components/quote_section";

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        var text = await (await fetch("http://localhost:3000/api/quote")).json()
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
    return (
        <main className="bg-gray-800 h-screen">
            <Navigation />
            <section className="mx-4 md:mx-12 lg:mx-24 text-center">
                <QuoteSection quote={quote} />
            </section>
        </main>
    )
}; export default Index