function Barline ({barline, x, y}) {
    const barlines = {
        "single": '𝄀',
        "double": '𝄁',
        "final": '𝄂',
    }

    return (
        <>
            <text x={x} y={y} fill="black" fontSize="30">
                {barlines[barline]}
            </text>
        </>        
    )
}

export default Barline;