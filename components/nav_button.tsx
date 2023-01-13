import Link from "next/link";
import { useState } from "react";
import Tooltip from "./tooltip";

type NavButtonProps = {
    icon: any,
    tooltip: string,
    href: string,
    classOverride?: string
}

const NavButton = ({icon, tooltip, href, classOverride}: NavButtonProps) => {
    let [hoverig, setHovering] = useState(false)

    return (
        <section className={classOverride === undefined ? "hover:scale-150 transition-transform px-2 my-4" : classOverride}>
            <Link href={href}
                onMouseOver={() => {
                    setHovering(true)
                }}
                onMouseLeave={() => {
                    setHovering(false)
                }}
            >
                {icon}
            </Link>
            {hoverig &&
                <Tooltip tooltip={tooltip} />
            }
        </section>
    )
}; export default NavButton;