import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Components/Screen/Home/HomeScreen';
import './_app.scss'
import { useState, useEffect } from 'react';
import Login from './Components/Screen/Login/Login'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';


const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleSidebar = () => toggleSidebar(value => !value)
  const handleClose = (width) => { width < 1224 && toggleSidebar(false) }

  // Sidebar open on startup if large screen
  useEffect(() => {
    window.innerWidth >= 1224 && toggleSidebar(true)
  }, []);
  window.onresize = () => {
    window.innerWidth >= 1224 && toggleSidebar(true)
    window.innerWidth < 1224 && toggleSidebar(false)
  }
  return (<>
    <Header handleSidebar={handleSidebar} />
    <div className="app_container">
      <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} handleClose={handleClose} />
      <div className={`app_main${sidebar ? ' open' : ''}`}>
        {children}
      </div>
    </div>
  </>)
}


function App() {

  // If user is not authenticated then redirect to login page
  const Navigatee = useNavigate();
  const { accessToken, loading } = useSelector(state => state.auth);
  useEffect(() => {
    if (!loading && !accessToken) {
      Navigatee('/auth');
    }
  }, [accessToken, loading, Navigatee]);

  return (
    <Routes>

      <Route exact path='/' element={
        <Layout>
          <Home />
        </Layout>
      } />

      <Route exact path='/auth' element={<Login />} />

      <Route exact path='*' element={<Navigate to="/" replace/>} />

    </Routes>
  );
}

export default App;
