import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatearDinero } from "../helpers";

const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setEsPresupuestoValido,
}) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce(
            (acc, gasto) => gasto.cantidad + acc,
            0
        );

        setDisponible(presupuesto - totalGastado);
        setGastado(totalGastado);
    }, [gastos]);

    useEffect(() => {
        //calcular porcentaje
        const nuevoPorcentaje = (
            ((presupuesto - disponible) * 100) /
            presupuesto
        ).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1500);
    }, [disponible]);

    const handleResetApp = () => {
        const resultado = confirm("¿Desea reiniciar Presupuesto y Gastos?");
        if (resultado) {
            setGastos([]);
            setPresupuesto(0);
            setEsPresupuestoValido(false);
        }
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
                        trailColor: "#f5f5f5",
                        textColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>
                    {formatearDinero(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span>
                    {formatearDinero(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>
                    {formatearDinero(gastado)}
                </p>
            </div>
        </div>
    );
};

export default ControlPresupuesto;
