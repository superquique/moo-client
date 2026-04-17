function TimeSignature ({bpm, noteValue, x}) {

    return (
        <>
            {/* <rect x="0" y="0" width="100%" height="100%" fill="green" fillOpacity="0.3" /> */}
            <text x={x} y="50" fill="black" fontSize="14">
                {bpm}
            </text>
            <text x={x} y="60" fill="black" fontSize="14">
                {noteValue}
            </text>
        </>        
    )
}

export default TimeSignature;