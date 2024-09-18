import './App.scss'
import LevelDetails from './components/LevelDetails/LevelDetails'
import Navbar from './components/Navbar/Navbar'
import RadialMenu from './components/RadialMenu/RadialMenu'
import StarRating from './components/StarRating/StarRating'

function App() {

  return (
    <>
      <Navbar />
      <StarRating />
      <LevelDetails />
      <RadialMenu />
    </>
  )
}

export default App
