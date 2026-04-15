// note = n#2'
export function decodeNote (note) {
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

export function divideMesaures (notes, bpm, noteValue) {
    const measures = []

    let measureValue = 0;
    let currentMeasure = [];

    notes.forEach((note) => {
        const decodedNote = decodeNote(note);

        currentMeasure.push(decodedNote);
        measureValue += 1 / decodedNote.length;

        if (measureValue === bpm/noteValue) {
            measures.push(currentMeasure);
            currentMeasure = [];
            measureValue = 0;
        }
    })

    if (currentMeasure.length > 0) {
        measures.push(currentMeasure);
    }

    return measures;
}