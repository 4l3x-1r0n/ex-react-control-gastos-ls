const formatearDinero = (valor) => {
    // //Intl nos permite formatear
    // const formatter = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD"
    // });
    // return formatter.format(valor);

    return (+valor).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }
    return fechaNueva.toLocaleDateString("es-ES", opciones)
}

const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
}

export { formatearDinero, formatearFecha, generarId };