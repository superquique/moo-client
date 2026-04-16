import { useEffect, useRef, useState } from "react";

function AddSheetForm ({onAddSheet, onCloseForm}) {
    const [title, setTitle] = useState("");
    const [clef, setClef] = useState("treble");
    const [timeSignature, setTimeSignature] = useState("4/4");
    const dialogRef = useRef(null);

    const pattern = /^[A-Za-z][A-Za-z0-9\-ñÑ ]*$/;
    const minLength = 3;
    const maxLength = 60;
    const validClefs = ["treble", "alto", "base"];
    const validTimeSignatures = ["4/4", "3/4", "2/4"];

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleSubmit = (e) => {
        //e.preventDefault();

        if (!title || !clef || !timeSignature) {
            console.log(title, clef, timeSignature);
            return;
        }

        if (title.length < minLength || title.length > maxLength || !pattern.test(title)) {
            console.log(title.length < minLength , title.length > maxLength, pattern.test(title));
            return;
        }

        if (!validClefs.includes(clef) || !validTimeSignatures.includes(timeSignature)) {
            console.log(clef, timeSignature);
            return;
        }

        const payload = {
            title,
            clef,
            timeSignature,
            keySignature: "",
            notes: "",
            chords: "",
            lyrics: ""
        }

        console.log("adding sheet...");
        onAddSheet(payload);
        dialogRef.current.close();
        onCloseForm();
    }
    
    return (
        <dialog 
            ref={dialogRef} 
            id="add-sheet-modal" 
            className="modal"
            onClose={onCloseForm}
        >
            <div className="flex-grow flex items-center justify-center">
                <div className="card w-100 bg-base-100 card-xl shadow-sm">
                    <div className="card-body">

                        <form className="space-y-4" method="dialog">
                            <h3 className="font-bold text-lg">New Sheet</h3>
                                    
                            <input 
                                type="text" 
                                className="input validator" 
                                placeholder="Title"
                                pattern={pattern.source}
                                minLength={minLength}
                                maxLength={maxLength}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required 
                            />
                            <p className="validator-hint hidden">
                                Must be 3 to 60 characters
                                <br />containing only letters, numbers or dash
                            </p>
                            
                            <select 
                                className="select"
                                value={clef}
                                onChange={(e) => setClef(e.target.value)}
                            >
                                <option disabled={true}>Pick a clef</option>
                                <option value="treble">𝄞 Treble</option>
                                <option value="alto">𝄡 Alto</option>
                                <option value="bass">𝄢 Bass</option>
                            </select>
                            <select 
                                className="select"
                                value={timeSignature}
                                onChange={(e) => setTimeSignature(e.target.value)}
                            >
                                <option disabled={true}>Pick a time signature</option>
                                <option value="4/4">4/4</option>
                                <option value="3/4">3/4</option>
                                <option value="2/4">2/4</option>
                            </select>
                            <div className="modal-action">
                                <button 
                                    type="button" 
                                    onClick={e => dialogRef.current.close()} 
                                    className="btn"
                                >
                                    Cancel
                                </button>
                                <button onClick={(e) => handleSubmit(e)} className="btn">Create</button>
                                
                            </div>
                        
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default AddSheetForm;