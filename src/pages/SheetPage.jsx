import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Staff from '../components/music/Staff';
import sheetsService from '../services/sheets.service';
import useDebounce from "../hooks/useDebounce";
import { divideMesaures } from '../decoding/mooParser';
import { BackspaceIcon } from '@heroicons/react/24/outline';

function SheetPage ({}) {
    const [sheet, setSheet] = useState(null);
    const [measures, setMeasures] = useState(null);
    const [selectedLength, setSelectedLength] = useState("4")
    const debouncedSheet = useDebounce(sheet, 2000);
    const { id } = useParams();
    //const measures = [0, 1, 2, 3];
    const staffs = [2, 3, 4, 5, 6, 7, 8];
    
    useEffect(() => {
        console.log("Updating sheet with...", debouncedSheet);
        if (debouncedSheet !== null) {
            notifyPromise(updateSheet(debouncedSheet));
        }
    }, [debouncedSheet]);

    useEffect(() => {
        if (sheet !== null && sheet.notes) {
            setMeasures(divideMesaures(sheet.notes.split(" "), parseInt(sheet.timeSignature.split("/")[0]), parseInt(sheet.timeSignature.split("/")[1])));
        } else {
            setMeasures([]);
        }
        
    }, [sheet])

    const notifyPromise = (promise) => toast.promise(
        promise,
        {
            loading: 'Saving...',
            success: <b>Sheet saved</b>,
            error: <b>Could not save.</b>
        }
    );

    const getSheet = () => {
        sheetsService.getSheet(id)
        .then(result => { setSheet(result.data); })
        .catch(error => console.log(error));
    }
    
    const updateSheet = (payload) => {
        payload.id = id;
        return sheetsService.updateSheet(id, payload)
        
    }   

    const onChange = async (value, field) => {        
        const newSheet = {
            ...sheet,
            [field]: value,
        }

        setSheet(newSheet);
    }

    const onSelectLength = (e) => {
        setSelectedLength(e.target.value);
    }

    const addNote = (e) => {
        const newNote = `${e.target.value}${selectedLength}`;
        const notes = sheet.notes + ` ${newNote}`;
        onChange(notes.trim(), "notes");
    }

    const deleteNote = (e) => {
        const notes = sheet.notes.split(" ");
        console.log("deleting notes", notes);
        notes.pop();
        console.log("new notes", notes);
        console.log("notes string", notes.join(" "));
        onChange(notes.join(" "), "notes");
    }

    useEffect(() => {
        getSheet();
    }, [])

    if (!sheet) {
        return (
            <div className="flex pt-10 h-screen items-start justify-center">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        )
    }

    console.log("measures", measures);

    return (
        <>
            <section className="pt-10" id="center">
                <Toaster />
                <input 
                    type="text" 
                    placeholder="Title" 
                    className="input"
                    value={sheet.title}
                    onChange={(e) => onChange(e.target.value, "title")}
                />

                <div className="flex pt-10 items-start justify-center">
                    <label className="input">
                        <span className="label text-4xl">𝅗</span>
                        <input type="radio" name="radio-length" value="" onChange={onSelectLength}
                            checked={selectedLength === ''} className="radio" />
                    </label>

                    <label className="input">
                        <span className="label text-4xl">𝅗𝅥</span>
                        <input type="radio" name="radio-length" value="2" onChange={onSelectLength}
                            checked={selectedLength === '2'} className="radio" />
                    </label>

                    <label className="input">
                        <span className="label text-4xl">𝅘𝅥</span>
                        <input type="radio" name="radio-length" value="4" onChange={onSelectLength}
                            checked={selectedLength === '4'}
                            className="radio" />
                    </label>

                    <label className="input">
                        <span className="label text-4xl">𝅘𝅥𝅮</span>
                        <input type="radio" name="radio-length" value="8" onChange={onSelectLength}
                            checked={selectedLength === '8'}
                            className="radio" />
                    </label>

                    <label className="input">
                        <span className="label text-4xl">𝅘𝅥𝅯</span>
                        <input type="radio" name="radio-length" value="16" onChange={onSelectLength}
                            checked={selectedLength === '16'}
                            className="radio" />
                    </label>

                </div>

                <div className="flex pt-10 items-start justify-center">
                    <button value="a" onClick={addNote} className="btn btn-circle">
                        A
                    </button>
                    <button value="b" onClick={addNote} className="btn btn-circle">
                        B
                    </button>
                    <button value="c" onClick={addNote} className="btn btn-circle">
                        C
                    </button>
                    <button value="d" onClick={addNote} className="btn btn-circle">
                        D
                    </button>
                    <button value="e" onClick={addNote} className="btn btn-circle">
                        E
                    </button>
                    <button value="f" onClick={addNote} className="btn btn-circle">
                        F
                    </button>
                    <button value="g" onClick={addNote} className="btn btn-circle">
                        G
                    </button>
                    <button onClick={deleteNote} className="btn btn-circle">
                        <BackspaceIcon className="size-5 text-black-500" />
                    </button>
                </div>

                <svg height="200vh" width="80%" overflow="visible" xmlns="http://www.w3.org/2000/svg">
                    {/* <Staff notes={["a,", "a#2,", "b4,", "c8", "c#16", "d4", "d#4", "e4", "f4", "f#4",
                    "g4", "g#4", "a4", "a#4", "b4", "cn4'", "b4", "bb4", "a4", "ab4", "g4", "gb4", "f4",
                    "e4", "eb4", "d4", "db4", "c4"
                    ]} /> */}

                    <rect width="100%" height="100%" fill="red" fillOpacity="0.3" />

                    <Staff 
                        offset={0}
                        clef={sheet.clef}
                        timeSignature={sheet.timeSignature}
                        measures={measures}
                    />

                    {/* { 
                        staffs.map((staff) => (  
                            <Staff 
                                key={staff}
                                offset={staff * 150} 
                            />
                        ))
                    } */}
                </svg>
            </section>
        </>
    )
}

export default SheetPage;