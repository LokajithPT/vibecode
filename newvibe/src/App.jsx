import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainExperience from './MainExperience'
import ThreeDPage from './ThreeDPage'
import CheckingPage from './CheckingPage'
import CarPage from './CarPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainExperience />} />
        <Route path="/3d" element={<ThreeDPage />} />
        <Route path="/checking" element={<CheckingPage />} />
        <Route path="/car" element={<CarPage />} />
      </Routes>
    </Router>
  )
}

export default App