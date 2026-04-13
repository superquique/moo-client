import Note from "./Note";

function Staff({notes, offset}) {
    const lines = [0, 1, 2, 3, 4]
    const gap = 10;
    const hGap = 40;
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

    // note = n#2'
    const decodeNote = (note) => {
        const match = note.match(/^([a-gA-G][#bn]?)(\d*)([,']*)/);

        if (match) {
            let [_, note, length, octave] = match;
            
            if (octave.includes(",")) {
                octave = octave.length * -1;
            } else {
                octave = octave.length;
            }

            let accidental = "";

            if (note.length > 1) {
                accidental = note[1];
            }

            return {name: note, accidental, length, octave};
        }
    }

    const decodedNotes = notes.map(note => decodeNote(note));


    return (
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">


            {lines.map((i) => (
                <line
                key={i}
                x1="0"
                y1={ i * gap + offset }
                x2="100%"
                y2={ i * gap + offset }
                style={{stroke: "#797979", strokeWidth: 2}}
                />
            ))}
            
            {decodedNotes.map((note, i) => (
                <Note 
                    key={i + lines.length}
                    length={note.length}
                    accidental={note.accidental}
                    x={i * hGap}
                    y={(noteIndexes[note.name[0]] - note.octave * 7) * gap/2 + offset}
                    absIndex={noteIndexes[note.name[0]] - note.octave * 7}
                    gap={gap}
                />
            ))}
        
        </svg>
    )
}

export default Staff;