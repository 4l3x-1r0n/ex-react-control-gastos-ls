import React from "react";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({
    presupuesto,
    setPresupuesto,
    esPresupuestoValido,
    setEsPresupuestoValido,
    gastos,
    setGastos,
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {esPresupuestoValido ? (
                <ControlPresupuesto
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setEsPresupuestoValido={setEsPresupuestoValido}
                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setEsPresupuestoValido={setEsPresupuestoValido}
                />
            )}
        </header>
    );
};

export default Header;
