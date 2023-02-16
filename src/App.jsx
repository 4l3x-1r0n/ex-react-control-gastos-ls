import { useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { useEffect } from "react";

function App() {
    const [presupuesto, setPresupuesto] = useState(0);
    const [esPresupuestoValido, setEsPresupuestoValido] = useState(false);
    const [modal, setModal] = useState(false);

    const [animarModal, setAnimarModal] = useState(false);

    const [gastos, setGastos] = useState([]);

    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState("");
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    //cargar desde localstorage
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("gastos")) ?? "";
        if (data.presupuesto) {
            setPresupuesto(data.presupuesto);
            setGastos(data.gastos);
            setEsPresupuestoValido(true);
        }
    }, []);
    useEffect(() => {
        const data = {
            presupuesto,
            gastos,
        };
        localStorage.setItem("gastos", JSON.stringify(data));
    }, [gastos]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length) {
            handleNuevogasto();
        }
    }, [gastoEditar]);

    useEffect(() => {
        if (filtro) {
            const gastosFiltrados = gastos.filter(
                (gasto) => gasto.categoria === filtro
            );
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro]);

    const handleNuevogasto = () => {
        setModal(true);

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    const guardarGasto = (_gasto) => {
        if (_gasto.id) {
            _gasto.fecha = Date.now();
            const gastosActualizados = gastos.map((gasto) =>
                gasto.id === _gasto.id ? _gasto : gasto
            );
            setGastos(gastosActualizados);
        } else {
            _gasto.id = generarId();
            _gasto.fecha = Date.now();
            setGastos([...gastos, _gasto]);
        }
    };

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
        setGastos(gastosActualizados);
    };

    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                esPresupuestoValido={esPresupuestoValido}
                setEsPresupuestoValido={setEsPresupuestoValido}
            />
            {esPresupuestoValido && (
                <>
                    <main>
                        <Filtros setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="icono nuevogasto"
                            onClick={handleNuevogasto}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
}

export default App;
