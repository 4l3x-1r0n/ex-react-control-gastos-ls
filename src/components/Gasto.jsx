import React from "react";
import { formatearFecha } from "../helpers";
import Modal from "./Modal";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

const diccionarioIconos = new Map();
diccionarioIconos.set("ahorro", IconoAhorro);
diccionarioIconos.set("casa", IconoCasa);
diccionarioIconos.set("comida", IconoComida);
diccionarioIconos.set("gastos", IconoGastos);
diccionarioIconos.set("ocio", IconoOcio);
diccionarioIconos.set("salud", IconoSalud);
diccionarioIconos.set("suscripciones", IconoSuscripciones);

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
    const { nombre, cantidad, categoria, fecha, id } = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={diccionarioIconos.get(categoria)}
                            alt="imagen categorias"
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el: {""}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

export default Gasto;