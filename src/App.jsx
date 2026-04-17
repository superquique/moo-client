import './App.css';
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SheetPage from './pages/SheetPage';
import Navbar from './components/Navbar';
import NotebookListPage from './pages/NotebookListPage';
import NotebookPage from './pages/NotebookPage';
import SheetListPage from './pages/SheetListPage';
import MainPage from './pages/MainPage';


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <Routes>
        <Route 
          path="/"
          element={<IsPrivate> <MainPage /> </IsPrivate>}
        />

        <Route 
          path="/signup" 
          element={<IsAnon> <SignupPage /> </IsAnon>} 
        />

        <Route 
          path="/login" 
          element={<IsAnon> <LoginPage /> </IsAnon>} 
        />

        <Route 
          path="/sheets"
          element={<IsPrivate> <SheetListPage /> </IsPrivate>}
        />

        <Route 
          path="/sheets/:id"
          element={<IsPrivate> <SheetPage /> </IsPrivate>}
        />

        <Route 
          path="/notebooks"
          element={<IsPrivate> <NotebookListPage /> </IsPrivate>}
        />

        <Route 
          path="/notebooks/:id"
          element={<IsPrivate> <NotebookPage /> </IsPrivate>}
        />

      </Routes>
      
    </div>
  )
}

export default App
