import { useEffect, useState } from "react";
import notebooksService from '../services/notebooks.service';
import sheetsService from "../services/sheets.service";
import { Link, useParams } from "react-router-dom";
import { DocumentPlusIcon, HeartIcon, MusicalNoteIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
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

    const searchByTitle = (title) => {
        sheetsService.getAllSheetsFromNotebookWithTitle(id, title)
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
    };

    useEffect(() => {
        getNotebook();
        getSheets();
    }, [])

    return (
        
        <div className="pt-1">
            { isFormOpen && <AddSheetForm onAddSheet={addSheet} onCloseForm={closeForm} /> }
            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="sticky top-16 z-100 bg-base-100  shadow-sm flex justify-between items-center p-4 pb-2 text-xs tracking-wide">
                    <div className="flex items-center gap-2">
                        <Link to={`/notebooks`}>Notebooks </Link> /  {notebook && notebook.name}
                        
                        <button onClick={openForm} className="btn btn-square btn-primary btn-ghost">
                            <DocumentPlusIcon className="size-6 text-black-500" />
                        </button>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input 
                            type="text" 
                            placeholder="Search"
                            className="input input-bordered w-64 lg:w-128"
                            onChange={e => searchByTitle(e.target.value)} 
                        />
                    </div>
                </li>

                {!sheets && 
                    <div className="flex p-5 items-center justify-center">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                }

                {sheets && sheets.length === 0 &&
                    <div className="flex flex-col w-screen p-5 gap-4 items-center justify-center">
                        <h2 className="card-title text-center">
                            You haven't added any sheets yet! <br />
                            Tap the button to add some.
                        </h2>
                        <button onClick={openForm} className="btn btn-primary btn-xl btn-square">
                            <DocumentPlusIcon className="size-8 text-black-500" />
                        </button>
                    </div>
                }
                
                {sheets && sheets.map((sheet) => (
                    
                    <li key={sheet._id} className="list-row">
                        <div className="flex items-center">
                            <MusicalNoteIcon className="size-6 text-black-500" />
                            {/* <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/> */}
                        </div>
                        <div className="flex items-center">
                            <Link to={`/sheets/${sheet._id}`}>
                                <div>{sheet.title}</div>
                                <div className="text-xs uppercase font-semibold opacity-60"></div>
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

export default NotebookPage;