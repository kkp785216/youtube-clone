import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Components/Screen/Home/HomeScreen';
import './_app.scss'
import { useState, useEffect } from 'react';
import Login from './Components/Screen/Login/Login'
import { Routes, Route, Navigate } from 'react-router-dom';
import Watch from './Components/Screen/Watch/Watch';


const Layout = ({children, navClass, appClass}) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleSidebar = () => toggleSidebar(value => !value)
  const handleClose = (width) => { width < 1224 && toggleSidebar(false) }

  // Sidebar open on startup if large screen
  useEffect(() => {
      navClass === 'watch-nav' ?
      window.innerWidth >= 1224 && toggleSidebar(false) : 
      window.innerWidth >= 1224 && toggleSidebar(true);
  }, [navClass]);
  window.onresize = () => {
    navClass === 'watch-nav' ?
    window.innerWidth >= 1224 && toggleSidebar(false) : 
    window.innerWidth >= 1224 && toggleSidebar(true);
    window.innerWidth < 1224 && toggleSidebar(false)
  }
  return (<>
    <Header handleSidebar={handleSidebar} />
    <div className="app_container">
      <Sidebar sidebar={sidebar} navClass={navClass} handleSidebar={handleSidebar} handleClose={handleClose} />
      <div className={`app_main${sidebar ? ' open' : ''}${appClass ? ' '+appClass : ''}`}>
        {children}
      </div>
    </div>
  </>)
}


function App() {

  return (
    <Routes>

      <Route exact path='/' element={
        <Layout>
          <Home />
        </Layout>
      } />

      <Route exact path='/search' element={
        <Layout>
          <Home />
        </Layout>
      } />

      <Route exact path='/watch' element={
        <Layout navClass="watch-nav" appClass='watch-app'>
          <Watch />
        </Layout>
      } />

      <Route exact path='/feed/subscription' element={
        <Layout>
          <h1>Subscription</h1>
        </Layout>
      } />

      <Route exact path='/auth' element={<Login />} />

      <Route exact path='*' element={<Navigate to="/" replace/>} />

    </Routes>
  );
}

export default App;
