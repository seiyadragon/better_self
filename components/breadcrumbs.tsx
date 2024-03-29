import Link from "next/link";

export type CrumbLink = {
    name: string,
    href: string
}

type BreadCrumbsProps = {
    breadCrumbs: Array<CrumbLink>
}

const BreadCrumbs = ({breadCrumbs}: BreadCrumbsProps) => {
    return (
        <section className="shadow-lg">
            <ul className="mx-4 md:mx-12 lg:mx-24 text-center text-xl text-white flex flex-row py-4">
                {breadCrumbs.map((crumb, index) => {
                    let isLast = index >= breadCrumbs.length - 1 ? true : false

                    return (
                        <Link key={crumb.name} href={crumb.href} className="flex flex-row" onClick={(event) => {
                            isLast ? event.preventDefault() : true
                        }}>
                            {index > 0 && <p className="mx-2">►</p>}
                            <p className={isLast ? "text-left text-orange-400" : "text-left hover:underline"}>{crumb.name}</p>
                        </Link>
                    )
                })}
            </ul>
        </section>
    )
}; export default BreadCrumbs