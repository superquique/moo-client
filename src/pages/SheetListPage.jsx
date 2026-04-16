
import { useEffect, useState } from "react";
import notebooksService from '../services/notebooks.service';
import { Link } from "react-router-dom";
import { DocumentPlusIcon, FolderIcon, FolderPlusIcon, HeartIcon, MusicalNoteIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import NotebookForm from "../components/NotebookForm";
import sheetsService from "../services/sheets.service";
import AddSheetForm from "../components/AddSheetForm";


function SheetListPage () {
    const [sheets, setSheets] = useState(null);
    const [editingSheet, setEditingSheet] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const getSheets = () => {
        sheetsService.getAllSheets()
        .then((response) => setSheets(response.data))
        .catch((error) => console.log(error));
    }

    const addSheet = (payload) => {
        //payload.notebook = id; 
        
        sheetsService.createSheet(payload)
        .then((response) => getSheets())
        .catch((error) => console.log(error));
    }

    const startEdition = (sheet) => {
        setEditingSheet(sheet);
        openForm();
    }

    const editSheet = (name, id) => {
        notebooksService.updateNotebook(id, {name})
        .then((response) => {
            setEditingNotebook(null);
            getNotebooks();
        })
        .catch((error) => console.log(error));
    }

    const deleteSheet = (id) => {
        sheetsService.deleteSheet(id)
        .then((response) => getSheets())
        .catch((error) => console.log(error))
    }

    const toggleFavorite = (id, isFavorite) => {
        sheetsService.updateSheet(id, {isFavorite: !isFavorite})
        .then((response) => {
            getSheets();
        })
        .catch((error) => console.log(error));
    }

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => { 
        setIsFormOpen(false);
        setEditingNotebook(null);
    };

    useEffect(() => {
        getSheets();
    }, [])

    return (
        
        <div className="pt-1">
            { isFormOpen && <AddSheetForm onAddSheet={addSheet} onCloseForm={closeForm} /> }
            <ul className="list bg-base-100 rounded-box shadow-md">
  
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    
                    Sheets

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
                            </Link>
                            <Link key={sheet.notebook?._id} to={`/notebooks/${sheet.notebook?._id}`}>
                                <div className="flex items-center gap-2 text-xs uppercase font-semibold opacity-60">
                                    {sheet.notebook && 
                                        <FolderIcon className="size-4 text-black-500" />
                                    }
                                    {sheet.notebook?.name}
                                </div>
                            </Link>
                        </div>
                        <button onClick={() => toggleFavorite(sheet._id, sheet.isFavorite)} className="btn btn-square btn-ghost">
                            {sheet.isFavorite ? 
                                <HeartIconSolid className="size-5 text-secondary" />
                                :
                                <HeartIcon className="size-5 text-black-500" />
                            }
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

export default SheetListPage;