import React from 'react';
import Note from "./Note";
import Clef from "./Clef";
import TimeSignature from "./TimeSignature";
import { decodeNote } from "../../decoding/mooParser";
import Barline from "./Barline";

function Staff({clef, timeSignature, measures, x, y, showTimeSignature}) {
    const lines = [0, 1, 2, 3, 4]
    const gap = 5;
    const hGap = 20;
    let extraHGap = 0;
    const cIndex = 11;
    const noteIndexes = {
        'c': cIndex,
        'd': cIndex - 1,
        'e': cIndex - 2,
        'f': cIndex - 3,
        'g': cIndex - 4,
        'a': cIndex - 5,
        'b': cIndex - 6
    }

    const clefIndexes = {
        'bass': 2,
        'treble': 10,
        'alto': 4
    }

    const bpm = timeSignature ? parseInt(timeSignature.split("/")[0]) : "";
    const noteValue = timeSignature ? parseInt(timeSignature.split("/")[1]) : "";

    if (clef) {
        extraHGap += hGap;
    }    

    if (timeSignature) {
        extraHGap += hGap;
    }
    
    return (
        <svg x="0" y={y} width="100%" height="20%" viewBox="0 0 400 100" overflow="visible">
            <rect width="100%" height="100%" fill="blue" fillOpacity="0.3" />

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

            { clef && <Clef clef={clef} x="0" y="65" />}
            { showTimeSignature && <TimeSignature bpm={bpm} noteValue={noteValue} x={hGap} y1={4 * gap/2 + 40} y2={8 * gap/2 + 40} />}
            
            {measures && measures.map((measure, i) => {
                let currentX = 20;
                return <svg key={`measure-${i}`} x={`${i * 25}%`} y="0" width="25%" 
                overflow="visible">
                    <rect x="0" y="0" width="100%" height="100%" fill="yellow" fillOpacity="0.3" />

                    {measure.map((note, i) => {
                        const xPos = currentX;

                        let multiplier = bpm/note.length;
                        currentX += (multiplier * hGap);

                        return <Note 
                            key={`note-${i}`}
                            length={note.length}
                            accidental={note.accidental}
                            x={xPos}
                            y={(noteIndexes[note.name[0]] - note.octave * 7) * gap/2 + 40}
                            absIndex={noteIndexes[note.name[0]] - note.octave * 7}
                            gap={gap}
                        />
                    })}

                    <Barline barline="single" x="97" y={60}/>
                </svg>
º           })}
        
        </svg>
    )
}

export default Staff;