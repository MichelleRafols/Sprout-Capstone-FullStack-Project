import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import IndoorActivitiesPage from './pages/IndoorActivitiesPage/IndoorActivitiesPage';
import OutdoorActivitiesPage from './pages/OutdoorActivitiesPage/OutdoorActivitiesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ReflectionsPage from './pages/ReflectionsPage/ReflectionsPage';
import ReflectionsListPage from './pages/ReflectionsListPage/ReflectionsListPage';
import EditReflectionPage from './pages/EditReflectionsPage/EditReflectionsPage';
import EnergyDetailsPage from './pages/EnergyDetailsPage/EnergyDetailsPage';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/energy-details/:energyLevel" element={<EnergyDetailsPage />} />
        <Route path='/levels/:id/indoor-activities' element={<IndoorActivitiesPage />} />
        <Route path='/levels/:id/outdoor-activities' element={<OutdoorActivitiesPage />} />
        <Route path='/reflections' element={<ReflectionsPage />} />
        <Route path="/reflections/list" element={<ReflectionsListPage />} />
        <Route path="/reflections/:id/edit" element={<EditReflectionPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
