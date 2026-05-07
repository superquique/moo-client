import { useEffect, useState } from "react";
import sheetsService from "../services/sheets.service";
import { ChevronRightIcon, FolderIcon, HeartIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import notebooksService from "../services/notebooks.service";


function MainPage () {
    const [sheets, setSheets] = useState(null);
    const [notebooks, setNotebooks] = useState(null);

    const getSheets = () => {
        sheetsService.getFavoriteSheets()
        .then((response) => setSheets(response.data))
        .catch((error) => console.log(error));
    }

    const getNotebooks = () => {
        notebooksService.getFavoriteNotebooks()
        .then((response) => setNotebooks(response.data))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getSheets();
        getNotebooks();
    }, [])

    
    return (
        <div className="pt-1">
            <div>
                <div className="flex justify-between items-center p-4 pb-2 text-xl opacity-70 tracking-wide">     
                    <div className="flex gap-4">
                        <HeartIconSolid className="size-8 text-secondary" /> 
                        Favorite Sheets
                    </div>

                    <Link to={`/sheets`}>
                        <div className="flex gap-2 items-center">
                            All sheets 
                            <ChevronRightIcon className="size-6 text-black-500" />
                        </div>
                    </Link>
                </div>
                <div className="carousel rounded-box w-full">
                    {!sheets && 
                        <div className="flex w-screen p-5 items-center justify-center">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    }

                    {sheets && sheets.length === 0 &&
                        <div className="flex flex-col w-screen p-5 gap-1 items-center justify-center">
                            <h2 className="card-title text-center">
                                You haven't added any favorite sheets yet! <br />
                                Tap the heart to add some
                            </h2>
                            <HeartIcon className="size-5 text-black-500" />
                        </div>
                    }

                    {sheets && sheets.map((sheet, i) => (
                        <div key={`carousel-item-${i}`} className="carousel-item p-2">
                            <div className="card bg-base-100 w-60 card-sm shadow-sm">
                                <figure className="pt-10">
                                    <Link key={sheet._id} to={`/sheets/${sheet._id}`}>    
                                        <MusicalNoteIcon className="size-22 text-black-500" />
                                    </Link>
                                </figure>
                                <div className="card-body">
                                    <Link key={sheet._id} to={`/sheets/${sheet._id}`}>    
                                        <h2 className="card-title">{sheet.title}</h2>
                                        <p></p>
                                    </Link> 

                                    <div className="card-actions">
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
                                
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-4">
                <div className="flex justify-between items-center p-4 pb-2 text-xl opacity-70 tracking-wide">     
                    <div className="flex gap-4">
                        <HeartIconSolid className="size-8 text-secondary" /> 
                        Favorite Notebooks
                    </div>

                    <Link to={`/notebooks`}>
                        <div className="flex gap-2 items-center">
                            All Notebooks 
                            <ChevronRightIcon className="size-6 text-black-500" />
                        </div>
                    </Link>
                </div>
                <div className="carousel rounded-box w-full">
                    {!notebooks && 
                        <div className="flex w-screen p-5 items-center justify-center">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    }

                    {notebooks && notebooks.length === 0 &&
                        <div className="flex flex-col w-screen p-5 gap-1 items-center justify-center">
                            <h2 className="card-title text-center">
                                You haven't added any favorite notebooks yet! <br />
                                Tap the heart to add some
                            </h2>
                            <HeartIcon className="size-5 text-black-500" />
                        </div>
                    }

                    {notebooks && notebooks.map((notebook, i) => (
                        <div key={`carousel-item-${i}`} className="carousel-item p-2">
                            <div className="card bg-base-100 w-60 card-md shadow-sm">
                                <figure className="pt-10">
                                    <Link key={notebook._id} to={`/notebooks/${notebook._id}`}>    
                                        <FolderIcon className="size-22 text-black-500" />
                                    </Link>
                                </figure>
                                <div className="card-body">
                                    <Link key={notebook._id} to={`/notebooks/${notebook._id}`}>    
                                        <h2 className="card-title">{notebook.name}</h2>
                                        <p></p>
                                    </Link> 

                                    <div className="card-actions">
                                        
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            
        </div>

    )
}

export default MainPage;