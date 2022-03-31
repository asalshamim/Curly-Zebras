// routing

import { Routes, Route, BrowserRouter } from 'react-router-dom';
// pages
//import Home from './views/Home';
import Menu from './views/Menu';
import About from './views/About';
import Status from './views/Status';
// css
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <About/> } />
                    <Route path="/menu" element={ <Menu/> } />
                    <Route path="/about" element={ <About/> } /> 
                    <Route path="/status" element={ <Status/> } />
                </Routes>
            </BrowserRouter>
            
           
        </div>
    );
}

export default App;
