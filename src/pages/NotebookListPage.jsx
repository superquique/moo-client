import { useEffect, useState } from "react";
import notebooksService from '../services/notebooks.service';
import { Link } from "react-router-dom";
import { FolderIcon, FolderPlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import NotebookForm from "../components/NotebookForm";


function NotebookListPage () {
    const [notebooks, setNotebooks] = useState(null);
    const [editingNotebook, setEditingNotebook] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const getNotebooks = () => {
        notebooksService.getAllNotebooks()
        .then((response) => setNotebooks(response.data))
        .catch((error) => console.log(error));
    }

    const addNotebook = (name) => {
        notebooksService.createNotebook({name})
        .then((response) => {
            getNotebooks();
        })
        .catch((error) => console.log(error));
    }

    const startEdition = (notebook) => {
        setEditingNotebook(notebook);
        openForm();
    }

    const editNotebook = (name, id) => {
        notebooksService.updateNotebook(id, {name})
        .then((response) => {
            setEditingNotebook(null);
            getNotebooks();
        })
        .catch((error) => console.log(error));
    }

    const deleteNotebook = (id) => {
        notebooksService.deleteNotebook(id)
        .then((response) => {
            getNotebooks();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => { 
        setIsFormOpen(false);
        setEditingNotebook(null);
    };

    useEffect(() => {
        getNotebooks();
    }, [])

    return (
        
        <div className="pt-1">
            { isFormOpen && 
                <NotebookForm 
                    key={editingNotebook?._id || "new"}
                    onSave={
                        (name) => {
                            if (editingNotebook){
                                editNotebook(name, editingNotebook._id);
                            } else {
                                addNotebook(name);
                            }
                        }
                    }
                    onCloseForm={closeForm}
                    existingNotebook={editingNotebook}
                />
            }

            <ul className="list bg-base-100 rounded-box shadow-md">
  
                <li className="flex justify-betweeen items-center p-4 pb-2 text-xs opacity-60 tracking-wide">
                    Notebooks

                    <button onClick={openForm} className="btn btn-square btn-ghost">
                        <FolderPlusIcon className="size-6 text-black-500" />
                    </button>

                    <input type="text" placeholder="Search" className="input input-bordered w-64 lg:w-auto" />
                    
                    <div></div>
                </li>

                {!notebooks && 
                    <div className="flex pt-10 h-screen items-start justify-center">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                }
                
                {notebooks && notebooks.map((notebook) => (
                    
                    <li key={notebook._id} className="list-row">
                        <div>
                            <FolderIcon className="size-6 text-black-500" />
                            {/* <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/> */}
                        </div>
                        <div>
                            <Link key={notebook._id} to={`/notebooks/${notebook._id}`}>
                                <div>{notebook.name}</div>
                                <div className="text-xs uppercase font-semibold opacity-60"></div>
                            </Link>
                        </div>
                        <button className="btn btn-square btn-ghost">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                        </button>
                        <button className="btn btn-square btn-ghost" onClick={(e) => startEdition(notebook)}>
                            <PencilSquareIcon className="size-5 text-black-500" />
                            {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg> */}
                        </button>
                        <button className="btn btn-square btn-ghost" onClick={(e) => deleteNotebook(notebook._id)}>
                            <TrashIcon className="size-5 text-black-500" />
                            {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg> */}
                        </button>
                    </li>

                ))}
                
            </ul>
        </div>
    )
}

export default NotebookListPage;