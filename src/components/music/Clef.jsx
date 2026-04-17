function Clef ({clef, x, y}) {
    const clefs = {
        "treble": '𝄞',
        "alto": '𝄡',
        "bass": '𝄢',
    }

    return (
        <>
            <text x={x} y={y} fill="black" fontSize="20">
                {clefs[clef]}
            </text>
        </>        
    )
}

export default Clef;