import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';



function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      
    </>
  )
}

export default App
