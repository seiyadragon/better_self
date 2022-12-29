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
            <p className="text-orange-500 lg:text-6xl text-4xl pb-8"><strong>{quote.quote}</strong></p>
            <p className="text-orange-700 lg:text-4xl text-2xl border-t-2 border-orange-400"><strong>{quote.author}</strong></p>
        </section>
    )
}; export default QuoteSection