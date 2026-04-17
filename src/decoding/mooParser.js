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
        console.log(decodedNote)
        currentMeasure.push(decodedNote);
        
        let noteLength = decodedNote.length || 1;

        console.log("noteLength", noteLength, decodedNote.length);

        measureValue += 1 / noteLength;

        if (measureValue === bpm/noteValue) {
            measures.push([...currentMeasure]);
            currentMeasure = [];
            measureValue = 0;
        }
    })

    if (currentMeasure.length > 0) {
        measures.push(currentMeasure);
    }

    return measures;
}

// mps = measures per staff, bpm = beats per measure,
// (keySignature = bpm / noteValue)
export function divideStaffs (notes, mps, bpm, noteValue) {
    const measures = divideMesaures(notes, bpm, noteValue);
    
    const staffs = [];
    let currentStaff = [];

    measures.forEach((measure) => {
        currentStaff.push(measure);
        if (currentStaff.length === mps) {
            staffs.push([...currentStaff]);
            currentStaff = [];
        }
    })

    if (currentStaff.length > 0) {
        staffs.push(currentStaff);
    }

    return staffs;
}