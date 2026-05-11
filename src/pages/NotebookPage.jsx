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

                <div className="sticky top-16 z-100 bg-base-100 shadow-sm flex flex-col lg:flex-row justify-between items-center pt-2 px-2 pb-2 text-xs tracking-wide">
                    <div className="flex items-center justify-between w-full lg:w-auto lg:gap-4 p-1">
                        <div>
                            <Link to={`/notebooks`}>Notebooks</Link> / {notebook && notebook.name}
                        </div>
                        
                        <button onClick={openForm} className="btn btn-square btn-primary">
                            <DocumentPlusIcon className="size-6 text-black-500" />
                        </button>
                    </div>

                    <div className="flex items-center w-full lg:w-128 pt-2">
                        <input
                            type="text" 
                            placeholder="Search"
                            className="input input-bordered w-full"
                            onChange={e => searchByTitle(e.target.value)} 
                        />
                    </div>
                </div>

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
                        <div className="flex items-center justify-center gap-1">
                            {/* <MusicalNoteIcon className="size-6 text-black-500" /> */}
                            <div className="text-2xl flex leading-none items-center justify-center">
                                {sheet.clef === "treble" && "𝄞"}
                            </div>
                            <div className="flex flex-col leading-none text-lg">
                                <p className="align-text-bottom"> {sheet.timeSignature.split("/")[0]}</p>
                                <p className="align-text-top"> {sheet.timeSignature.split("/")[1]}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div>
                                <Link key={sheet._id} to={`/sheets/${sheet._id}`}>
                                    <div className="text-base">{sheet.title}</div>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
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
                        </div>
                    </li>

                ))}
                
            </ul>
        </div>
    )
}

export default NotebookPage;