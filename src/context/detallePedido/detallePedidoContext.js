import React from "react";

const DetallePedidoContext = React.createContext();

const DetallePedidoProvider = ({ children }) => {
	const [idRegistroC, setIdRegistro] = React.useState("");
	const [NumeroPedidoC, setNumeroPedido] = React.useState("");
	const [CodigoProductoC, setCodigoProducto] = React.useState("");
	const [CantidadC, setCantidad] = React.useState("");
	const [CanceladoC, setCancelado] = React.useState("");
	const [NotasC, setNotas] = React.useState("");
	const [ElaboradoC, setElaborado] = React.useState("");
	const [EntregadoC, setEntregado] = React.useState("");
	const [FacturadoC, setFacturado] = React.useState("");
	const [subproductoC, setsubproducto] = React.useState("");
	return (
		<DetallePedidoContext.Provider value={{
				idRegistroC, setIdRegistro, 
				NumeroPedidoC, setNumeroPedido,
				CodigoProductoC, setCodigoProducto,
				CantidadC, setCantidad,
				CanceladoC, setCancelado,
				NotasC, setNotas,
				ElaboradoC, setElaborado,
				EntregadoC, setEntregado,
				FacturadoC, setFacturado,
				subproductoC, setsubproducto
			}
		}>
			{children}
		</DetallePedidoContext.Provider>
	)
}

export {DetallePedidoContext, DetallePedidoProvider};