
type TooltipProps = {
    tooltip: string
}

const Tooltip = ({tooltip}: TooltipProps) => {
    return (
        <p className="absolute text-white text-xs px-4 my-2 right-3 bg-zinc-900 opacity-80">
            <i>{tooltip}</i>
        </p>
    )
}; export default Tooltip;