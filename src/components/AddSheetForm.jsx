import { useState } from "react";

function AddSheetForm ({onAddSheet}) {
    const [title, setTitle] = useState("");
    const [clef, setClef] = useState("treble");
    const [timeSignature, setTimeSignature] = useState("4/4");

    const handleSubmit = (e) => {
        //e.preventDefault();

        const payload = {
            title,
            clef,
            timeSignature
        }

        onAddSheet(payload);
    }
    
    return (
        <dialog id="add-notebook-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">New Sheet</h3>
                <input 
                    type="text" 
                    className="input validator" 
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
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
                    <option>4/4</option>
                    <option>3/4</option>
                    <option>2/4</option>
                </select>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cancel</button>
                        <button onClick={(e) => handleSubmit(e)} className="btn">Create</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddSheetForm;