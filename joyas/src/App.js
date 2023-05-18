import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./views/Header"; 
import CajaView from "./views/CajaView";

//Importación de los Hooks que serán utilizados.
import  Context  from "./Context/Context";
import {useState} from 'react';

function App() {


  const [urlSelect, setUrlSelect] = useState("http://localhost:3001/joyas");
  const [datos, setDatos] = useState([]);
  //Selección de constantes a ser enviadas a través de los componentes. 
  const globalState = { urlSelect, setUrlSelect,datos, setDatos};


  return (
    <div className="App">
      <Context.Provider value={ globalState }>
      <Header />
      <CajaView />
      </Context.Provider>
    </div>
  );
}

export default App;
