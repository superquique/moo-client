import { useEffect, useRef, useState } from "react";

function NotebookForm ({onSave, onCloseForm, existingNotebook = null}) {
    const [name, setName] = useState("");
    const dialogRef = useRef(null);

    const pattern = /^[A-Za-z][A-Za-z0-9\- ]*$/;
    const minLength = 3;
    const maxLength = 60;

    useEffect(() => {
        if (existingNotebook) {
            setName(existingNotebook.name);
        } else {
            setName("");
        }
    }, [existingNotebook]);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleSubmit = (e) => {
        if (!name) {
            return
        }

        if (name.length >= minLength && name.length <= maxLength && pattern.test(name)){
            onSave(name);
            dialogRef.current.close();
            onCloseForm();
        }
    }

    return (
        <dialog
            ref={dialogRef}
            id="add-notebook-modal" 
            className="modal"
            onClose={onCloseForm}
        >
            <div className="modal-box">
                <h3 className="font-bold text-lg">New Notebook</h3>
                <form method="dialog">
                    <input 
                        type="text" 
                        className="input validator" 
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        pattern={pattern.source}
                        minLength={minLength}
                        maxLength={maxLength}
                        required
                    />
                    <p className="validator-hint">
                        Must be 3 to 60 characters
                        <br />containing only letters, numbers or dash
                    </p>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button 
                            type="button" 
                            onClick={e => dialogRef.current.close()} 
                            className="btn"
                        >
                            Cancel
                        </button>
                        <button onClick={e => handleSubmit(e)} className="btn">
                            { existingNotebook ? 'Save' : 'Create'}
                        </button>
                    </div>
                </form>                
            </div>
        </dialog>
    )
}

export default NotebookForm;