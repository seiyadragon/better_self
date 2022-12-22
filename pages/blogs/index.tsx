import Footer from "../../components/footer";
import HeadManager from "../../components/head_manager";
import Navigation from "../../components/navigation";

const Blogs = () => {
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
            <section className="mx-4 md:mx-12 lg:mx-24 min-h-screen">

            </section>
            <Footer />
        </main>
    )
}; export default Blogs