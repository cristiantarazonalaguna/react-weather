import React,{Fragment, useState, useEffect} from 'react';
import Header from './componenets/Header';
import Formulario from './componenets/Formulario';
import Clima from './componenets/Clima';
import Error from './componenets/Error';

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  });

  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({});

  const {ciudad, pais} = busqueda;

  const [error, guardarError] = useState(false);



    useEffect(()=>{
      const key ='dbdf0da5ce30a79e65f0bb671392c69b';
      const consultarApi = async()=>{

        if(consultar){
          const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`);
        const obj = await api.json();
        guardarResultado(obj);
        // Detecta si hubo errores en la cosnulta
        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false);
        }
        guardarConsultar(false);
      }
      
        }
       consultarApi(); 
       //eslint-disable-next-line
    },[consultar]);

    let componente;
    if(error){

      componente = <Error mensaje = "No hay Resultados"/>;

    }else{
      componente = <Clima
      resultado = {resultado}
    />
    }
    
  return (
   <Fragment>
     <Header
      titulo='Clima react app'
     />
     <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda = {busqueda}
                guardarBusqueda = {guardarBusqueda}
                guardarConsultar = {guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
     </div>
   </Fragment>
  );
}

export default App;
