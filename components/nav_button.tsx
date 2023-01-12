import Link from "next/link";
import { useState } from "react";


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
                <p className="absolute text-white text-xs bg-orange-400 py-2 px-4 my-2 rounded-full opacity-80 right-3">
                    {tooltip}
                </p>
            }
        </section>
    )
}; export default NavButton;