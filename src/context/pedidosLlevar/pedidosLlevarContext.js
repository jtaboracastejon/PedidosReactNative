import React from "react";

const PedidosLlevarContext = React.createContext();

const PedidosLlevarProvider = ({ children }) => {
	const [idRegistro, setIdRegistro] = React.useState("");
	const [idPedido, setIdPedido] = React.useState("");
	const [idCliente, setIdCliente] = React.useState("");
	const [jsonDatos, setJsonDatos] = React.useState("");
	return (
		<PedidosLlevarContext.Provider value={{idRegistro, setIdRegistro, idPedido, setIdPedido, idCliente, setIdCliente, jsonDatos, setJsonDatos}}>
			{children}
		</PedidosLlevarContext.Provider>
	)
}

export {PedidosLlevarContext, PedidosLlevarProvider};