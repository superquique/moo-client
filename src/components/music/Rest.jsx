function Rest ({length, x, y, gap}) {
    const lengths = {
        "": '𝄻',
        "2": '𝄼',
        "4": '𝄽',
        "8": '𝄾',
        "16": '𝄿',
    }

    return (
        <>
            <text x={x} y={y} fill="black" fontSize="20">
                {lengths[length]}
            </text>
        </>        
    )
}

export default Rest;