import { Route, Routes } from 'react-router-dom';
import './App.css';
import DragUpload from './Components/DragUpload'
import Home from './Components/Home';
import Home2 from './pages/Home2';
import Query from './Components/Query';
import Billing from './Components/Billing';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home2 />}> </Route>
        <Route path='/uploads' element={<DragUpload />}> </Route>
        <Route path='/tools' element={<Home />}> </Route>
        <Route path='/query' element={<Query />}> </Route>
        <Route path='/billing' element={<Billing />}> </Route>
      </Routes>
      {/* <button>Get Started</button> */}
     
    </div>
  );
}

export default App;
