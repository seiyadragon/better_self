
const FOOTER_CLASS = "bg-zinc-900 w-full py-4 px-4 text-white lg:px-24"

const Footer = () => {
    return (
        <footer className={FOOTER_CLASS}>
            <p className="text-2xl">What is success?</p>
            <p>
                {
                    `Success is often defined by financial or professional achievements, 
                    but true success is a holistic approach that encompasses all aspects of life. 
                    It is a mindset that involves sacrifice, self-control, and the ability to balance 
                    short-term pleasure with long-term goals. Adopting a success mindset requires 
                    discipline and the ability to control one's mind and emotions. 
                    It is not easy, but those who are able to do so are truly successful in all 
                    areas of their life.`
                }
            </p>
        </footer>
    )
}; export default Footer