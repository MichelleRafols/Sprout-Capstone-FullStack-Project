import './App.scss'
import LevelDetails from './components/LevelDetails/LevelDetails'
import Navbar from './components/Navbar/Navbar'
// import RadialMenu from './components/RadialMenu/RadialMenu'
// import StarRating from './components/StarRating/StarRating'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import IndoorActivitiesPage from './pages/IndoorActivitiesPage/IndoorActivitiesPage';
import OutdoorActivitiesPage from './pages/OutdoorActivitiesPage/OutdoorActivitiesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='levels/:id/indoor-activities' element={<IndoorActivitiesPage />} />
        <Route path='levels/:id/outdoor-activities' element={<OutdoorActivitiesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
