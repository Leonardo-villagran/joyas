import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./views/Header"; 
import CajaView from "./views/CajaView";
import EditView from './views/EditView';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//Importación de los Hooks que serán utilizados.

import  Context  from "./Context/Context";
import {useState} from 'react';

const url = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001/joyas";

function App() {

  const [urlSelect, setUrlSelect] = useState(url);
  const [datos, setDatos] = useState([]);
  
  //Selección de constantes a ser enviadas a través de los componentes. 
  const globalState = { urlSelect, setUrlSelect,datos, setDatos};

  return (
    <Router>
      <Context.Provider value={ globalState }>
      <Header />
      <Routes>
      <Route path="/" element= {<CajaView />} />
      <Route path="/edit/:id" element= {<EditView/>} />
      </Routes>
      </Context.Provider>
      </Router>
  );
}

export default App;
