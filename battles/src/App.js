import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import CharacterSelectionPage from './pages/CharacterSelectionPage/CharacterSelectionPage'
import ShopPage from './pages/ShopPage/ShopPage'

function App() {
  return (
    <Router>
      <div className = "main-style">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/CharacterSelection" element={<CharacterSelectionPage/>}/>
          <Route path="/Shop" element={<ShopPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
