function Barline ({barline, x, y}) {
    const barlines = {
        "single": '𝄀',
        "double": '𝄁',
        "final": '𝄂',
    }

    return (
        <>
            <text x={x} y={y} fill="black" fontSize="20">
                {barlines[barline]}
            </text>
        </>        
    )
}

export default Barline;