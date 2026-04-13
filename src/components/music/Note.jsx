function Note ({length, accidental, x, y, absIndex, gap}) {
    const lengths = {
        "": '𝅗',
        "2": '𝅗𝅥',
        "4": '𝅘𝅥',
        "8": '𝅘𝅥𝅮',
        "16": '𝅘𝅥𝅯',
        "*": '𝅘𝅥',
    }

    const accidentals = {
        "": "",
        "#": "♯",
        "b": "♭",
        "n": "♮"
    }

    let extraBars = 0;

    if (absIndex > 9) {
        extraBars = Math.floor((absIndex - 9) / 2);
    } else if (absIndex  < 1) {
        extraBars = Math.ceil(Math.abs(absIndex) / 2);
    }

    return (
        <>
            {[...Array(extraBars).keys()].map((_, i) => {
                const dIndex = i + 1
                return (<line
                    key={y + dIndex * gap}
                    x1={x}
                    y1={absIndex > 9 ? 10 * gap + i * gap : 4 * gap - i * gap}
                    x2={x + 14}
                    y2={absIndex > 9 ? 10 * gap + i * gap : 4 * gap - i * gap}
                    style={{stroke: "#494949", strokeWidth: 2}}
                />)
            })}
            <text x={x - 10} y={y} fill="red" fontSize="35">
                {accidentals[accidental]}
            </text>
            <text x={x} y={y} fill="black" fontSize="35">
                {lengths[length]}
            </text>
        </>        
    )
}

export default Note;