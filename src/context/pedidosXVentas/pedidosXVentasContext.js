import React from "react";

const PedidosXVentasContext = React.createContext();

const  PedidosXVentasProvider = ({ children }) => {
	const [idPedidosXVentas, setIdPedidosXVentas] = React.useState("");
	const [jsonDatos, setJsonDatos] = React.useState("");
	return (
		<PedidosXVentasContext.Provider value={{idPedidosXVentas, setIdPedidosXVentas, jsonDatos, setJsonDatos}}>
			{children}
		</PedidosXVentasContext.Provider>
	)
}

export {PedidosXVentasContext, PedidosXVentasProvider};