
type TooltipProps = {
    tooltip: string,
    color: string,
}

const Tooltip = ({tooltip, color}: TooltipProps) => {
    return (
        <p className={"absolute text-white text-xs my-2 right-9 opacity-80 py-2 px-2 rounded-full" + ` ${color}`}>
            <i className="opacity-100">{tooltip}</i>
        </p>
    )
}; export default Tooltip;