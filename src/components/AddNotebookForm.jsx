import { useState } from "react";

function AddNotebookForm ({onAddNotebook}) {
    const [name, setName] = useState("");

    

    return (
        <dialog id="add-notebook-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">New Notebook</h3>
                <input 
                    type="text" 
                    className="input validator" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cancel</button>
                        <button onClick={(e) => onAddNotebook(name)} className="btn">Create</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddNotebookForm;