function TimeSignature ({bpm, noteValue, x, y1, y2}) {

    return (
        <>
            {/* <rect x="0" y="0" width="100%" height="100%" fill="green" fillOpacity="0.3" /> */}
            <text x={x} y="45" fill="black" fontSize="15" dominantBaseline="central">
                {bpm}
            </text>
            <text x={x} y="55" fill="black" fontSize="15" dominantBaseline="central">
                {noteValue}
            </text>
        </>        
    )
}

export default TimeSignature;