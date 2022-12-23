import { FaArrowRight } from "react-icons/fa";


type BreadCrumbsProps = {
    breadCrumbs: Array<string>
}

const BreadCrumbs = ({breadCrumbs}: BreadCrumbsProps) => {
    return (
        <ul className="mx-4 md:mx-12 lg:mx-24 text-center text-lg text-white flex flex-row">
            {breadCrumbs.map((crumb, index) => {
                return (
                    <li key={crumb} className="flex flex-row">
                        {index > 0 && <p className="mx-2">→</p>}
                        <p className="text-left">{crumb}</p>
                    </li>
                )
            })}
        </ul>
    )
}; export default BreadCrumbs