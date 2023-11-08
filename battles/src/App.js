import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import CharacterSelectionPage from './pages/CharacterSelectionPage/CharacterSelectionPage';
import ShopPage from './pages/ShopPage/ShopPage';
import FightingArena from './pages/FightingArena/FightingArena';
import { useLocation } from 'react-router-dom';
import "../src/styles/main/style.css";

function App() {
  return (
    <Router>
      <div className = "main-style">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/CharacterSelection" element={<CharacterSelectionPage/>}/>
          <Route path="/Shop" element={<ShopPage/>}/>
          <Route path="/FightingArena" element={<FightingArena/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
