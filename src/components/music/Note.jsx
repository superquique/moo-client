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
                console.log("extraBars", extraBars);
                return (<line
                    key={`extra-bar-${i}`}
                    x1={x - 1}
                    y1={absIndex > 9 ? 13 * gap + i * gap : -1 * gap - i * gap + 40}
                    x2={x + 9}
                    y2={absIndex > 9 ? 13 * gap + i * gap : -1 * gap - i * gap + 40}
                    style={{stroke: "black", strokeWidth: 1}}
                />)
            })}
            <text x={x - 10} y={y} fill="red" fontSize="20">
                {accidentals[accidental]}
            </text>
            <text x={x} y={y} fill="black" fontSize="20">
                {lengths[length]}
            </text>
        </>        
    )
}

export default Note;