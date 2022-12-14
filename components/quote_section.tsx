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
        <section className="w-full px-24">
            <p className="text-white text-8xl">{quote.quote}</p>
            <p className="text-gray-300 text-4xl text-right">{`- ${quote.author}`}</p>
        </section>
    )
}; export default QuoteSection