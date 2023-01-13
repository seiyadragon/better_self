import { useState } from "react";

type TooltipButtonProps = {
    icon: any,
    tooltip: string,
    classOverride?: string,
    onClick: any
}

const TooltipButton = ({icon, tooltip, classOverride, onClick}: TooltipButtonProps) => {
    let [hoverig, setHovering] = useState(false)

    return (
        <section className={classOverride === undefined ? "hover:scale-150 transition-transform px-2 my-4" : classOverride}>
            <button 
                onMouseOver={() => {
                    setHovering(true)
                }}
                onMouseLeave={() => {
                    setHovering(false)
                }}
                onClick={() => onClick}
            >
                {icon}
            </button>
            {hoverig &&
                <p className="absolute text-white text-xs bg-zinc-900 py-2 px-4 my-2 rounded-full opacity-80 right-3">
                    {tooltip}
                </p>
            }
        </section>
    )
}; export default TooltipButton;