import React from "react";

const PedidosContext = React.createContext();

const PedidosProvider = ({ children }) => {
    const [NumeroPedidoC, setNumeroPedidoC] = React.useState("");
    const [idmeseroC, setIdmeseroC] = React.useState("");
	const [EstacionC, setEstacionC] = React.useState("");
	const [activoC, setActivoC] = React.useState("");
	const [modalidadC, setModalidadC] = React.useState("");
	const [estadoC, setEstadoC] = React.useState("");
	const [jsonDatos, setJsonDatos] = React.useState("");
	return (
		<PedidosContext.Provider 
        value={{
            NumeroPedidoC, setNumeroPedidoC,
            idmeseroC, setIdmeseroC,
            EstacionC, setEstacionC,
            activoC, setActivoC,
            modalidadC, setModalidadC,
            estadoC, setEstadoC,
            jsonDatos, setJsonDatos
        }}>
			{children}
		</PedidosContext.Provider>
	)
}

export {PedidosContext, PedidosProvider};