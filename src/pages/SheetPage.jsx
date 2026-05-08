import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Staff from '../components/music/Staff';
import sheetsService from '../services/sheets.service';
import useDebounce from "../hooks/useDebounce";
import { divideStaffs } from '../decoding/mooParser';
import { BackspaceIcon, ChevronDownIcon, ChevronUpIcon, HeartIcon, PencilIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

function SheetPage ({}) {
    const [sheet, setSheet] = useState(null);
    const [staffs, setStaffs] = useState(null);
    const [selectedLength, setSelectedLength] = useState("4")
    const [selectedOctave, setSelectedOctave] = useState(0);
    const [isFABOpen, setIsFABOpen] = useState(0);
    const debouncedSheet = useDebounce(sheet, 2000);
    const { id } = useParams();

    const measuresPerStaff = 4;

    useEffect(() => {
        console.log("Updating sheet with...", debouncedSheet);
        if (debouncedSheet !== null) {
            notifyPromise(updateSheet(debouncedSheet));
        }
    }, [debouncedSheet]);

    useEffect(() => {
        if (sheet !== null && sheet.notes) {
            setStaffs(divideStaffs(
                sheet.notes.split(" "),
                measuresPerStaff,
                parseInt(sheet.timeSignature.split("/")[0]), 
                parseInt(sheet.timeSignature.split("/")[1])
            ));

        } else {
            setStaffs([]);
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

    const toggleFavorite = (id, isFavorite) => {
        sheetsService.updateSheet(id, {isFavorite: !isFavorite})
        .then((response) => {
            getSheet();
        })
        .catch((error) => console.log(error));
    }

    const onSelectLength = (e) => {
        setSelectedLength(e.target.value);
    }

    const onSelectOctave = (octaveDiff) => {
        if (selectedOctave + octaveDiff < -2) {
            return;
        }

        if (selectedOctave + octaveDiff > 2) {
            return;
        }

        setSelectedOctave(selectedOctave + octaveDiff);
    }

    const addNote = (e) => {
        let octave = "";
        if (selectedOctave < 0) {
           octave = ",".repeat(Math.abs(selectedOctave));
        } else if (selectedOctave > 0) {
            octave = "'".repeat(selectedOctave);
        }

        const newNote = `${e.target.value}${selectedLength}${octave}`;

        const notes = sheet.notes + ` ${newNote}`;
        onChange(notes.trim(), "notes");
    }

    const deleteNote = (e) => {
        const notes = sheet.notes.split(" ");
        notes.pop();
        onChange(notes.join(" "), "notes");
    }

    useEffect(() => {
        getSheet();
    }, [])

    if (!sheet) {
        return (
            <div className="flex pt-10 items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        )
    }

    return (
        <>
            <section className="flex flex-col justify-center items-center">
                <Toaster />
                <div className="sticky top-16 z-100 bg-base-100 shadow-sm flex justify-between items-center w-full p-4 tracking-wide">
                    
                    <div></div>

                    <input 
                        type="text" 
                        placeholder="Title" 
                        className="input input-sm input-ghost w-128 text-lg font-bold text-center"
                        value={sheet.title}
                        onChange={(e) => onChange(e.target.value, "title")}
                    />

                    <button onClick={() => toggleFavorite(sheet._id, sheet.isFavorite)} className="btn btn-square btn-ghost">
                        {sheet.isFavorite ? 
                            <HeartIconSolid className="size-8 text-secondary" />
                            :
                            <HeartIcon className="size-8 text-black-500" />
                        }
                    </button>
                </div>

                <div className={`fab fab-flower ${isFABOpen ? 'open' : ''}`}>
                    {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
                    <div tabIndex={0} role="button" onClick={(e) => setIsFABOpen(true)} className="btn btn-circle text-2xl btn-primary">
                        {selectedLength === '' && '𝅗'}
                        {selectedLength === '2' && '𝅗𝅥'}
                        {selectedLength === '4' && '𝅘𝅥'}
                        {selectedLength === '8' && '𝅘𝅥𝅮'}
                        {selectedLength === '16' && '𝅘𝅥𝅯'}
                    </div>

                    {/* Main Action button replaces the original button when FAB is open */}
                    <button onClick={(e) => setIsFABOpen(false)} className="fab-close btn btn-circle">
                        <PencilIcon className="size-5 text-black-500" />
                    </button>

                    {/* buttons that show up when FAB is open */}
                    <button 
                        className={`btn text-2xl btn-circle ${selectedLength === '' ? 'btn-primary': ''}`} 
                        value="" onClick={onSelectLength}>
                        𝅗
                    </button>
                    <button 
                        className={`btn text-2xl btn-circle ${selectedLength === '2' ? 'btn-primary': ''}`}
                        value="2" onClick={onSelectLength}>
                        𝅗𝅥
                    </button>
                    <button 
                        className={`btn text-2xl btn-circle ${selectedLength === '4' ? 'btn-primary': ''}`}
                        value="4" onClick={onSelectLength}>
                        𝅘𝅥
                    </button>
                    <button 
                        className={`btn text-2xl btn-circle ${selectedLength === '8' ? 'btn-primary': ''}`}
                        value="8" onClick={onSelectLength}>
                        𝅘𝅥𝅮
                    </button>
                    <button 
                        className={`btn text-2xl btn-circle ${selectedLength === '16' ? 'btn-primary': ''}`} 
                        value="16" onClick={onSelectLength}>
                        𝅘𝅥𝅯
                    </button>

                    {/* Buttons to show in the outer circle */}
                    <div className="fab-flower-outer">
                        <button value="a" onClick={addNote} className="btn btn-circle">
                            {selectedOctave < 0 ? ",".repeat(Math.abs(selectedOctave)) : ""}
                            A
                            {selectedOctave > 0 ? "'".repeat(selectedOctave) : ""}
                        </button>
                        <button value="b" onClick={addNote} className="btn btn-circle">
                            {selectedOctave < 0 ? ",".repeat(Math.abs(selectedOctave)) : ""}
                            B
                            {selectedOctave > 0 ? "'".repeat(selectedOctave) : ""}
                        </button>
                        <button value="c" onClick={addNote} className="btn btn-circle">
                            {selectedOctave < 0 ? ",".repeat(Math.abs(selectedOctave)) : ""}
                            C
                            {selectedOctave > 0 ? "'".repeat(selectedOctave) : ""}
                        </button>
                        <button value="d" onClick={addNote} className="btn btn-circle">
                            {selectedOctave < 0 ? ",".repeat(Math.abs(selectedOctave)) : ""}
                            D
                            {selectedOctave > 0 ? "'".repeat(selectedOctave) : ""}
                        </button>
                        <button value="e" onClick={addNote} className="btn btn-circle">
                            {selectedOctave < 0 ? ",".repeat(Math.abs(selectedOctave)) : ""}
                            E
                            {selectedOctave > 0 ? "'".repeat(selectedOctave) : ""}
                        </button>
                        <button value="f" onClick={addNote} className="btn btn-circle">
                            {selectedOctave < 0 ? ",".repeat(Math.abs(selectedOctave)) : ""}
                            F
                            {selectedOctave > 0 ? "'".repeat(selectedOctave) : ""}
                        </button>
                        <button value="g" onClick={addNote} className="btn btn-circle">
                            {selectedOctave < 0 ? ",".repeat(Math.abs(selectedOctave)) : ""}
                            G
                            {selectedOctave > 0 ? "'".repeat(selectedOctave) : ""}
                        </button>
                    </div>

                    {/* Buttons to show in the inner circle */}
                    <div className="fab-flower-inner">
                        <button onClick={() => onSelectOctave(-1)} className="btn btn-circle">
                            <ChevronDownIcon className="size-5 text-black-500" />
                        </button>
                        <button onClick={() => onSelectOctave(1)} className="btn btn-circle">
                            <ChevronUpIcon className="size-5 text-black-500" />
                        </button>
                        <button onClick={deleteNote} className="btn btn-circle">
                            <BackspaceIcon className="size-5 text-black-500" />
                        </button>
                        
                    </div>
                </div>


                <svg height="200vh" width="80%" overflow="visible" xmlns="http://www.w3.org/2000/svg">
                    {/* <Staff notes={["a,", "a#2,", "b4,", "c8", "c#16", "d4", "d#4", "e4", "f4", "f#4",
                    "g4", "g#4", "a4", "a#4", "b4", "cn4'", "b4", "bb4", "a4", "ab4", "g4", "gb4", "f4",
                    "e4", "eb4", "d4", "db4", "c4"
                    ]} /> */}

                    {/* <rect width="100%" height="100%" fill="red" fillOpacity="0.3" /> */}
                    
                    { staffs && 
                        <Staff 
                            clef={sheet.clef}
                            timeSignature={sheet.timeSignature}
                            showTimeSignature={true}
                            measures={staffs[0]}
                            y={0}
                        />
                    }

                    { staffs &&
                        staffs.slice(1).map((staff, i) => (  
                            <Staff 
                                key={`staff-${i}`}
                                timeSignature={sheet.timeSignature}
                                showTimeSignature={false}
                                measures={staff}
                                y={`${i * 20 + 20}%`}
                            />
                        ))
                    }
                </svg>
            </section>
        </>
    )
}

export default SheetPage;