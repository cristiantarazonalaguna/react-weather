import React, {useState} from 'react';
import PropTypes from 'prop-types';
const Formulario = ({busqueda,guardarBusqueda, guardarConsultar}) => {
//state del formulario

const [error, guardarError] = useState(false);

//estrare ciudad y pasi 

    const {ciudad, pais} = busqueda;

    // FUnction que coloca los elementos en el statse

    const handlerChange = e=>{

        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }
    // cuando el usuario da submit al formulario

    const handlerSubmit = e=>{

        e.preventDefault();

        // Validar

        if(ciudad.trim() === '' || pais.trim() ===''){
             guardarError(true);
             return;
        }

        guardarError(false);

        //Pasarlo al componente principal

        guardarConsultar(true);

    }
    return ( 

        <form onSubmit = {handlerSubmit}>
            {error? <p className="red darken-4 error"> Todos los campos son oblogatorios</p>:null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handlerChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                 name="pais"
                 id="pais"
                 value={pais}
                 onChange={handlerChange}
                >
                    <option value="">----Seleccione un pais----</option>
                    <option value="US">Estados unidos</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Peru</option>
                </select>
                <label htmlFor="pais"></label>
            </div>

            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired,
}
 
export default Formulario;