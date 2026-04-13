function TimeSignature ({bpm, noteValue, x, y1, y2}) {

    return (
        <>
            <text x={x} y={y1} fill="black" fontSize="30">
                {bpm}
            </text>
            <text x={x} y={y2} fill="black" fontSize="30">
                {noteValue}
            </text>
        </>        
    )
}

export default TimeSignature;