import Navigation from "../components/navigation";
import Footer from "../components/footer";

const WEEKDAY_CLASS = "py-16 border-b-2 border-orange-400"

const Calendar = () => {
    return (
        <main className="bg-gray-800">
            <Navigation />
            <section className="mx-4 md:mx-12 lg:mx-24">
                <section className="grid grid-rows-7 text-left text-lg text-orange-400">
                    <p className={WEEKDAY_CLASS}>Monday</p>
                    <p className={WEEKDAY_CLASS}>Tuesday</p>
                    <p className={WEEKDAY_CLASS}>Wednesday</p>
                    <p className={WEEKDAY_CLASS}>Thursday</p>
                    <p className={WEEKDAY_CLASS}>Friday</p>
                    <p className={WEEKDAY_CLASS}>Saturday</p>
                    <p className={WEEKDAY_CLASS}>Sunday</p>
                </section>
            </section>
            <Footer />
        </main>
    )
}; export default Calendar