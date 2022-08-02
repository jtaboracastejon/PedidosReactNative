import React from "react";

const PedidosLlevarContext = React.createContext();

const PedidosLlevarProvider = ({ children }) => {

	const [NumeroPedido, setNumeroPedido] = React.useState("");
    const [idmesero, setIdmesero] = React.useState("");
	const [Estacion, setEstacion] = React.useState("");
	const [activo, setActivo] = React.useState("");
	const [modalidad, setModalidad] = React.useState("");
	const [estado, setEstado] = React.useState("");
	const [idRegistro, setIdRegistro] = React.useState("");
	const [idCliente, setIdCliente] = React.useState("");
	const [numeropedidocancelados, setnumeropedidocancelados] = React.useState("");
	const [usuariocancelados, setusuariocancelados] = React.useState("");
	const [fechahoracancelados, setfechahoracancelados] = React.useState("");
	const [idDetallePedido, setIdDetallePedido] = React.useState("");
	const [idRegistroElaborados, setIdRegistroElaborados] = React.useState("");

	// Pedidos Mesa
	const [idRegistroMesa, setIdRegistroMesa] = React.useState("");
	const [idPedidoMesa, setIdPedidoMesa] = React.useState("");
	const [idMesa, setIdMesa] = React.useState("");
	const [cuenta, setCuenta] = React.useState("");
	const [nombreCuenta, setNombreCuenta] = React.useState("");

	// Pedidos Elaborados
	const [idUsuario, setIdUsuario] = React.useState("");
	const [idPedido, setIdPedido] = React.useState("");

	// Pedidos Entregados
	const [idDetalleEntregado, setIdDetalleEntregado] = React.useState("");
	const [idUsuarioEntregado, setIdUsuarioEntregado] = React.useState("");
	const [idEntregaEntregado, setIdEntregaEntregado] = React.useState("");

	return (

		<PedidosLlevarContext.Provider value={{idDetallePedido, setIdDetallePedido, idPedido, 
    setIdPedido, idCliente, setIdCliente, idRegistroMesa, setIdRegistroMesa,idRegistroElaborados, 
    idUsuario, setIdUsuario, setIdRegistroElaborados, idRegistro, setIdRegistro, idMesa, setIdMesa, 
    cuenta, setCuenta, nombreCuenta, setNombreCuenta, idPedidoMesa, setIdPedidoMesa, idDetalleEntregado,
    setIdDetalleEntregado, idUsuarioEntregado, setIdUsuarioEntregado, idEntregaEntregado, setIdEntregaEntregado,
    numeropedidocancelados, setnumeropedidocancelados,usuariocancelados, setusuariocancelados,fechahoracancelados, 
    setfechahoracancelados, NumeroPedido, setNumeroPedido,
            idmesero, setIdmesero,
            Estacion, setEstacion,
            activo, setActivo,
            modalidad, setModalidad,
            estado, setEstado,}}>
			{children}
		</PedidosLlevarContext.Provider>
	)
}



export {PedidosLlevarContext, PedidosLlevarProvider};