
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentPlusIcon, FolderIcon, HeartIcon, MusicalNoteIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import sheetsService from "../services/sheets.service";
import AddSheetForm from "../components/AddSheetForm";


function SheetListPage () {
    const [sheets, setSheets] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const getSheets = () => {
        sheetsService.getAllSheets()
        .then((response) => setSheets(response.data))
        .catch((error) => console.log(error));
    }

    const searchByTitle = (title) => {
        sheetsService.getSheetsWithTitle(title)
        .then((response) => setSheets(response.data))
        .catch((error) => console.log(error));
    }

    const addSheet = (payload) => {
        //payload.notebook = id; 
        
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
        getSheets();
    }, [])

    return (
        
        <div>
            { isFormOpen && <AddSheetForm onAddSheet={addSheet} onCloseForm={closeForm} /> }
            <ul className="list bg-base-100 rounded-box shadow-md">
  
                <li className="sticky top-16 z-100 bg-base-100  shadow-sm flex justify-between items-center p-4 pb-2 text-xs tracking-wide">
                    <div className="flex items-center gap-2">
                        Sheets
                        <button onClick={openForm} className="btn btn-square btn-primary">
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
                                <Link key={sheet.notebook?._id} to={`/notebooks/${sheet.notebook?._id}`}>
                                    <div className="flex items-center gap-2 text-xs uppercase font-semibold opacity-60">
                                        {sheet.notebook && 
                                            <FolderIcon className="size-4 text-black-500" />
                                        }
                                        {sheet.notebook?.name}
                                    </div>
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

export default SheetListPage;