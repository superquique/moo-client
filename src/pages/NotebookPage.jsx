import { useEffect, useState } from "react";
import notebooksService from '../services/notebooks.service';
import sheetsService from "../services/sheets.service";
import { Link, useParams } from "react-router-dom";
import { DocumentPlusIcon, FolderIcon, FolderPlusIcon, MusicalNoteIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSheetForm from "../components/AddSheetForm";


function NotebookPage () {
    const [notebook, setNotebook] = useState(null);
    const [sheets, setSheets] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { id } = useParams();

    const getNotebook = () => {
        notebooksService.getNotebook(id)
        .then((response) => setNotebook(response.data))
        .catch((error) => console.log(error));
    }

    const getSheets = () => {
        sheetsService.getAllSheetsFromNotebook(id)
        .then((response) => setSheets(response.data))
        .catch((error) => console.log(error));
    }

    const addSheet = (payload) => {
        payload.notebook = id; 
        
        sheetsService.createSheet(payload)
        .then((response) => getSheets())
        .catch((error) => console.log(error));
    }

    const deleteSheet = (id) => {
        sheetsService.deleteSheet(id)
        .then((response) => getSheets())
        .catch((error) => console.log(error))
    }

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => { 
        setIsFormOpen(false);
        setEditingNotebook(null);
    };

    useEffect(() => {
        getNotebook();
        getSheets();
    }, [])

    return (
        
        <div>
            { isFormOpen && <AddSheetForm onAddSheet={addSheet} onCloseForm={closeForm} /> }
            <ul className="list bg-base-100 rounded-box shadow-md">
  
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    
                    Notebooks / {notebook && notebook.name}

                    <button onClick={openForm} className="btn btn-square btn-ghost">
                        <DocumentPlusIcon className="size-6 text-black-500" />
                        {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg> */}
                    </button>
                </li>
                
                {sheets && sheets.map((sheet) => (
                    
                    <li key={sheet._id} className="list-row">
                        <div>
                            <MusicalNoteIcon className="size-6 text-black-500" />
                            {/* <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/> */}
                        </div>
                        <div>
                            <Link key={sheet._id} to={`/sheets/${sheet._id}`}>
                                <div>{sheet.title}</div>
                                <div className="text-xs uppercase font-semibold opacity-60"></div>
                            </Link>
                        </div>
                        <button className="btn btn-square btn-ghost">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                        </button>
                        <button className="btn btn-square btn-ghost" onClick={(e) => deleteSheet(sheet._id)}>
                            <TrashIcon className="size-5 text-black-500" />
                            {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg> */}
                        </button>
                    </li>

                ))}
                
            </ul>
        </div>
    )
}

export default NotebookPage;