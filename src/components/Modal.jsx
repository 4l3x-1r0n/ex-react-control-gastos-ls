import { object } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {
    const [msg, setMsg] = useState("");

    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");

    const id = gastoEditar.id ?? "";

    useEffect(() => {
        if (Object.keys(gastoEditar).length) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
        }
    }, []);

    const cerrarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
            setGastoEditar({});
        }, 500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !cantidad || !categoria) {
            setMsg("Todos los Campos son Obligatorios");
            setTimeout(() => {
                setMsg("");
            }, 3000);
            return;
        }
        setMsg("");
        if (!id) {
            guardarGasto({ nombre, cantidad, categoria });
        } else {
            guardarGasto({ nombre, cantidad, categoria, id });
        }
        cerrarModal();
    };

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarBtn} alt="" onClick={cerrarModal} />
            </div>
            <form
                action="#"
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
            >
                <legend>{id ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto: ej. 300"
                        value={cantidad}
                        min="0"
                        onChange={(e) => setCantidad(+e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        name=""
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option disabled hidden value="">
                            -- Seleccione --
                        </option>
                        <option value="ahorro">Ahorro</option>
                        <option value="casa">Casa</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                    <input
                        type="submit"
                        name=""
                        id=""
                        value={id ? "Editar Gasto" : "Añadir Gastos"}
                    />
                    {msg && <Mensaje tipo="error">{msg}</Mensaje>}
                </div>
            </form>
        </div>
    );
};

export default Modal;
