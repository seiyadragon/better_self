import Link from "next/link";
import { useState } from "react";
import Tooltip from "./tooltip";

type NavButtonProps = {
    icon: any,
    tooltip: string,
    href: string,
    classOverride?: string,
    toolTipColor: string,
}

const NavButton = ({icon, tooltip, href, classOverride, toolTipColor}: NavButtonProps) => {
    let [hoverig, setHovering] = useState(false)

    return (
        <section className={classOverride === undefined ? "hover:scale-125 transition-transform px-2 my-4" : classOverride}>
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
                <Tooltip tooltip={tooltip} color={toolTipColor}/>
            }
        </section>
    )
}; export default NavButton;