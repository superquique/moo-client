import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, FolderIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";


function Navbar () {
    const { isLoggedIn, user, logOutUser} = useContext(AuthContext);

    return (
        <nav className="sticky top-0 z-1000">
            <div className="max-lg:collapse bg-base-300 lg:bg-base-200 shadow-sm w-full rounded-md">
                <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
                <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
                <div className="collapse-title navbar">
                    <div className="navbar-start w-full lg:w-1/2">
                        <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <NavLink to="/">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://i.pinimg.com/736x/e6/f6/2c/e6f62cc58c729184d27665dbf71170bb.jpg" />
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to="/">
                            <button className="btn btn-ghost text-base font-bold lg:text-xl">
                                Moo Music Notebook
                            </button>
                        </NavLink>
                        <div className="hidden lg:flex">
                            
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            { isLoggedIn && (
                                <>
                                    <li>
                                        <NavLink to="/notebooks">
                                            <FolderIcon className="size-6 text-black-500" />
                                            <button>Notebooks</button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/sheets">
                                            <MusicalNoteIcon className="size-6 text-black-500" />
                                            <button>Sheets</button>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    
                    <div className="navbar-end hidden lg:flex gap-1">
                        
                        { !isLoggedIn && (
                            <>
                                
                                <Link to="/signup"> 
                                    <button className="btn btn-primary">Sign Up</button> 
                                </Link>
                            
                                <NavLink to="/login"> 
                                    <button className="btn" >Login</button> 
                                </NavLink>
                                
                            </>
                        )}
                        { isLoggedIn && (
                            
                            <button className="btn" onClick={logOutUser}>
                                Logout
                            </button>
                            
                        )}
                        
                    </div>
                </div>

                <div className="collapse-content lg:hidden z-1">
                    <ul className="menu">
                        { isLoggedIn && (
                            <>
                                <li>
                                    <NavLink to="/notebooks">
                                        <FolderIcon className="size-6 text-black-500" />
                                        <button className="text-left">Notebooks</button>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sheets">
                                        <MusicalNoteIcon className="size-6 text-black-500" />
                                        <button className="text-left">Sheets</button>
                                    </NavLink>
                                </li>
                               <li> 
                                    <button className="text-left" onClick={logOutUser}>
                                        <ArrowLeftStartOnRectangleIcon className="size-5 text-black-500" />
                                        Logout
                                    </button>
                               </li>
                            </>
                        )}
                        { !isLoggedIn && (
                            <>
                                <li>
                                    <NavLink to="/signup">
                                        
                                        <button>Sign Up</button> 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">
                                        <ArrowRightEndOnRectangleIcon className="size-5 text-black-500" />
                                        <button>Login</button> 
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;