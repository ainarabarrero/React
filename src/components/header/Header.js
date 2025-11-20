import React from "react";
import Logo from '../img/ies1gijon_logo.jpg'

class Header extends React.Component{
    render(){
        return(
            <div className="bg-dark text-center text-white p-3">
                <img src={Logo} alt="Descripcion de la imagen" width="100px"></img>
                <h3>
                    Bienvenido a la página de incidencias
                </h3>
            </div>
        );
    }
}
export default Header