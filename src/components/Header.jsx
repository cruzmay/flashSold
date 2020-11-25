import React, { useState } from 'react';
import '../assets/styles/Header.scss'
import Logo from '../components/Logo'

const Header = () => {
    
    const a = "Guadalajara+ON"
    const b = "Mexico+ON"

    const [queryOrigin, setQueryOrigin] = useState(""); 
    console.log('Origin:', queryOrigin)
    const [queryDestination, setQueryDestination] = useState("");
    console.log('Destination:',queryDestination)
    return (
      <header className="map__header">
        <div className="map__header__promo">
            <h3>VENDE LO QUE QUIERAS NOSOTROS LO LLEVAMOS - 
                 <span> TU MEDIO ECÓNOMICO DE ENVIOS LOCALES</span>
            </h3>
        </div>
        <nav className="map__header__nav">
            <figure>
                <Logo/>
            </figure>
            <form action="post">
                <input 
                    type="search" 
                    placeholder="ENVIA DE:"
                    value={queryOrigin}
                    onChange={(e) => {
                    setQueryOrigin(e.target.value);
                    }}
                />
                <input 
                    type="search" 
                    placeholder="A:"
                    value={queryDestination}
                    onChange={(e) => {
                    setQueryDestination(e.target.value);
                }}
                
                />
                
            </form>    
        </nav>
    </header>
    )
};

export default Header;