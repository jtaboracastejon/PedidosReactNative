import React from "react";

const PedidosLlevarContext = React.createContext();

const PedidosLlevarProvider = ({ children }) => {
	// Pedidos Llevar
	const [idRegistro, setIdRegistro] = React.useState("");
	const [idCliente, setIdCliente] = React.useState("");
	const [idDetallePedido, setIdDetallePedido] = React.useState("");
	const [idRegistroElaborados, setIdRegistroElaborados] = React.useState("");

	// Pedidos Mesa
	const [idRegistroMesa, setIdRegistroMesa] = React.useState("");
	const [idPedidoMesa, setIdPedidoMesa] = React.useState("");
	const [idMesa, setIdMesa] = React.useState("");
	const [cuenta, setCuenta] = React.useState("");
	const [nombreCuenta, setNombreCuenta] = React.useState("");

	const [idUsuario, setIdUsuario] = React.useState("");
	const [idPedido, setIdPedido] = React.useState("");


	return (
		<PedidosLlevarContext.Provider value={{idDetallePedido, setIdDetallePedido, idPedido, setIdPedido, idCliente, setIdCliente, idRegistroMesa, setIdRegistroMesa,idRegistroElaborados, idUsuario, setIdUsuario, setIdRegistroElaborados, idRegistro, setIdRegistro, idMesa, setIdMesa, cuenta, setCuenta, nombreCuenta, setNombreCuenta, idPedidoMesa, setIdPedidoMesa}}>
			{children}
		</PedidosLlevarContext.Provider>
	)
}

export {PedidosLlevarContext, PedidosLlevarProvider};