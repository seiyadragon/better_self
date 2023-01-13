import { useState, MouseEventHandler } from "react";
import Tooltip from "./tooltip";

type TooltipButtonProps = {
    icon: any,
    tooltip: string,
    classOverride?: string,
    onClick: MouseEventHandler
}

const TooltipButton = ({icon, tooltip, classOverride, onClick}: TooltipButtonProps) => {
    let [hoverig, setHovering] = useState(false)

    return (
        <section className={classOverride === undefined ? "hover:scale-150 transition-transform px-4 my-4" : classOverride}
            onMouseOver={() => {
                setHovering(true)
            }}
            onMouseLeave={() => {
                setHovering(false)
            }}
        >
            <button
                onClick={onClick}
            >
                {icon}
            </button>
            {hoverig &&
                <Tooltip tooltip={tooltip}/>
            }
        </section>
    )
}; export default TooltipButton;