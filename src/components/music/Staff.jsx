import Note from "./Note";
import Rest from "./Rest";
import Clef from "./Clef";
import TimeSignature from "./TimeSignature";
import Barline from "./Barline";

function Staff({clef, timeSignature, measures, x, y, showTimeSignature}) {
    const lines = [0, 1, 2, 3, 4]
    const gap = 5;
    const hGap = 20;
    const cIndex = 11;
    const noteIndexes = {
        'c': cIndex,
        'd': cIndex - 1,
        'e': cIndex - 2,
        'f': cIndex - 3,
        'g': cIndex - 4,
        'a': cIndex - 5,
        'b': cIndex - 6,
    }

    const restIndexes = {
        "": '6',
        "2": '6',
        "4": '8',
        "8": '8',
        "16": '9',
    }

    const clefIndexes = {
        'bass': 2,
        'treble': 10,
        'alto': 4
    }

    const bpm = timeSignature ? parseInt(timeSignature.split("/")[0]) : "";
    const noteValue = timeSignature ? parseInt(timeSignature.split("/")[1]) : "";
    
    return (
        <svg x="0" y={y} width="100%" height="20%" viewBox="0 0 400 100" overflow="visible">
            {/* <rect width="100%" height="100%" fill="blue" fillOpacity="0.3" /> */}

            {lines.map((i) => (
                <line
                    key={i}
                    x1="0"
                    y1={ `${i * gap + 40}` }
                    x2="100%"
                    y2={ `${i * gap + 40}` }
                    style={{stroke: "#797979", strokeWidth: 1}}
                />
            ))}

            { clef && <Clef clef={clef} x="0" y="60" />}
            { showTimeSignature && <TimeSignature bpm={bpm} noteValue={noteValue} x={hGap} />}
            
            {measures && measures.map((measure, i) => {
                let currentX = hGap/2;
                if (showTimeSignature && i === 0) {
                    currentX += hGap * 1.2;
                }

                return <svg key={`measure-${i}`} x={`${i * 25}%`} y="0" width="25%" 
                overflow="visible">
                    {/* <rect x="0" y="0" width="100%" height="100%" fill="yellow" fillOpacity="0.3" /> */}

                    {measure.map((note, j) => {
                        let xPos = currentX;
                        
                        let noteLength = note.length || 1;
                        
                        let multiplier = bpm/noteLength;

                        if (showTimeSignature && i === 0) {
                            multiplier *= 0.9;
                        }

                        console.log(note.name, noteLength);
                        if (note.name === "r" && noteLength === 1) {
                            console.log("entered the pos x");
                            if (i === 0) {
                                xPos *= 1.5;
                            } else {
                                xPos *= 4;
                            }
                            
                        }

                        currentX += (multiplier * hGap);

                        if (note.name === "r") {
                            return <Rest 
                                key={`rest-${j}`}
                                length={note.length}
                                x={xPos}
                                y={(restIndexes[note.length]) * gap/2 + 40}
                                gap={gap}
                            />
                        }

                        return <Note 
                            key={`note-${j}`}
                            length={note.length}
                            accidental={note.accidental}
                            x={xPos}
                            y={(noteIndexes[note.name[0]] - note.octave * 7) * gap/2 + 40}
                            absIndex={noteIndexes[note.name[0]] - note.octave * 7}
                            gap={gap}
                        />
                    })}

                    <Barline barline="single" x="99" y={60}/>
                </svg>
            })}
        
        </svg>
    )
}

export default Staff;