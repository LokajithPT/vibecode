import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainExperience from './MainExperience'
import ThreeDPage from './ThreeDPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainExperience />} />
        <Route path="/3d" element={<ThreeDPage />} />
      </Routes>
    </Router>
  )
}

export default App