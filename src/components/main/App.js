import './App.css';
import  MiLista from '../lista/MiLista';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function App() {
  
  return (
    <>
        <Header/>
        <h1>Mi aplicación </h1>
       
        <div className="Parrafo">
          <p>Este es mi contenido de la app: </p>
        
        <MiLista></MiLista>
        </div>
       <Footer/> 
    </>
  );
}

export default App;
