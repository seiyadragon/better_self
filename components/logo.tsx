import Image from "next/image";

const LOGO_CLASS = "w-full lg:px-64 px-4 flex flex-col items-center"

const Logo = () => {
    return (
        <section className={LOGO_CLASS}>
            <Image src="/logo.png" width={800} height={300} alt="Logo Image" />
        </section>
    )
}; export default Logo