export type Quote = {
    author: string,
    quote: string,
    id: number,
}

export type QuoteProps = {
    quote: Quote
}

const QuoteSection = ({quote}: QuoteProps) => {
    return (
        <section className="w-full lg:px-64 px-4 pb-24">
            <p className="text-orange-500 text-8xl border-b-2 border-orange-400"><strong>{quote.quote}</strong></p>
            <p className="text-orange-700 text-6xl"><strong>{quote.author}</strong></p>
        </section>
    )
}; export default QuoteSection