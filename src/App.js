
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import PrivateRoutes from './components/PrivateRoutes';

import SignIn from './pages/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="w-10/12 mx-auto">

        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignIn />} />

          <Route element={<PrivateRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        

        </Routes>
      </div>
    </Router>
  );
}

export default App;
