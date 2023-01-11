import Link from "next/link";

const LoginCall = () => {
    return (
        <section className="mx-4 md:mx-12 lg:mx-24 text-white text-center">
            <p className="text-4xl py-16">{"Log in to use the app. It's free!"}</p>
            <Link 
                href="/login" 
                className="py-8 px-16 lg:w-96 w-32 bg-green-600 hover:bg-green-500 self-center shadow-lg text-4xl"
            >
                Login!
            </Link>
        </section>
    )
}; export default LoginCall