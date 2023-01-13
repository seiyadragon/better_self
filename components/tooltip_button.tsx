import { useState, MouseEventHandler } from "react";
import Tooltip from "./tooltip";

type TooltipButtonProps = {
    icon: any,
    tooltip: string,
    classOverride?: string,
    onClick: MouseEventHandler,
    toolTipColor: string,
}

const TooltipButton = ({icon, tooltip, classOverride, onClick, toolTipColor}: TooltipButtonProps) => {
    let [hoverig, setHovering] = useState(false)

    return (
        <section className={classOverride === undefined ? "hover:scale-150 transition-transform px-4 my-4" : classOverride}
            style={{
                "display": "grid",
                "gridTemplateColumns": "1em auto",
            }}
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
                <Tooltip tooltip={tooltip} color={toolTipColor}/>
            }
        </section>
    )
}; export default TooltipButton;