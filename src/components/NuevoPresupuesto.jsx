import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setEsPresupuestoValido,
}) => {
    const [msg, setMsg] = useState("");

    // useEffect(() => {
    //     msg && console.log(msg);
    // }, [msg]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!presupuesto || presupuesto < 0) {
            setMsg("Introduzca un presupuesto valido");
            return;
        }
        setMsg("");
        setEsPresupuestoValido(true);
    };
    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Ingrese el Presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(+e.target.value)}
                    />
                </div>
                <input type="submit" value="Agregar" />
                {msg && <Mensaje tipo="error">{msg}</Mensaje>}
            </form>
        </div>
    );
};

export default NuevoPresupuesto;
