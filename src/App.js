import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Components/Screen/Home/HomeScreen';
import './_app.scss'
import { useState, useEffect } from 'react';
import Login from './Components/Screen/Login/Login'

function App() {

  const [sidebar, toggleSidebar] = useState(false);
  const handleSidebar = () => toggleSidebar(value => !value)
  const handleClose = (width) => {width < 1224 && toggleSidebar(false)}

  // Sidebar open on startup if large screen
  useEffect(()=>{
    window.innerWidth >= 1224 && toggleSidebar(true)
  }, []);
  window.onresize = () => {
    window.innerWidth >= 1224 && toggleSidebar(true)
    window.innerWidth < 1224 && toggleSidebar(false)
  }

  return (
    <>
      <Header handleSidebar={handleSidebar}/>
      <div className="app_container">
        <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} handleClose={handleClose}/>
        <div className={`app_main${sidebar ? ' open':''}`}>
          <Home />
        </div>
      </div>
      {/* <Login/> */}
    </>
  );
}

export default App;
