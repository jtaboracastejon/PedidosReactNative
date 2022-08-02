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
	const [idPedido, setIdPedido] = React.useState("");
	const [idCliente, setIdCliente] = React.useState("");
	const [jsonDatos, setJsonDatos] = React.useState("");
	return (
		<PedidosLlevarContext.Provider value={{idRegistro, setIdRegistro, idPedido, setIdPedido, idCliente, setIdCliente, jsonDatos, setJsonDatos,
			NumeroPedido, setNumeroPedido,
            idmesero, setIdmesero,
            Estacion, setEstacion,
            activo, setActivo,
            modalidad, setModalidad,
            estado, setEstado,
            jsonDatos, setJsonDatos
		}}>
			{children}
		</PedidosLlevarContext.Provider>
	)
}

export {PedidosLlevarContext, PedidosLlevarProvider};