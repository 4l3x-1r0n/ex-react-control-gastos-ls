import { useEffect, useState } from "react";

const Filtros = ({ setFiltro }) => {
    return (
        <div className="filtros sombra contenedor">
            <form action="">
                <div className="campo">
                    <label htmlFor="">Filtrar Gastos</label>
                    <select
                        name=""
                        id=""
                        onChange={(e) => setFiltro(e.target.value)}
                    >
                        <option value="">Sin Filtros</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="casa">Casa</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Filtros;
