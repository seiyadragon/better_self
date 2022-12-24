import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


export type CrumbLink = {
    name: string,
    href: string
}

type BreadCrumbsProps = {
    breadCrumbs: Array<CrumbLink>
}

const BreadCrumbs = ({breadCrumbs}: BreadCrumbsProps) => {
    return (
        <ul className="mx-4 md:mx-12 lg:mx-24 text-center text-lg text-white flex flex-row">
            {breadCrumbs.map((crumb, index) => {
                return (
                    <Link href={crumb.href} className="flex flex-row">
                        {index > 0 && <p className="mx-2">→</p>}
                        <p className="text-left">{crumb.name}</p>
                    </Link>
                )
            })}
        </ul>
    )
}; export default BreadCrumbs