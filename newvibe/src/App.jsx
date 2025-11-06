import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainExperience from './MainExperience'
import ThreeDPage from './ThreeDPage'
import CheckingPage from './CheckingPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainExperience />} />
        <Route path="/3d" element={<ThreeDPage />} />
        <Route path="/checking" element={<CheckingPage />} />
      </Routes>
    </Router>
  )
}

export default App