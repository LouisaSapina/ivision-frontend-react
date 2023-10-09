import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Processing from './pages/processing/Processing';
import Results from './pages/results/Results';
import Matches from './pages/matches/Matches';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/search' element={<Processing />} />
          <Route exact path='/results' element={<Results />} />
          <Route path='/results/:iin' element={<Matches />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
