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


function App() {

  return (
    <div>
      
      <Navbar />

      <Routes>
        <Route 
          path="/signup" 
          element={<IsAnon> <SignupPage /> </IsAnon>} 
        />

        <Route 
          path="/login" 
          element={<IsAnon> <LoginPage /> </IsAnon>} 
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
