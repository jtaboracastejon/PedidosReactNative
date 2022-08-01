export default (estado, accion) => {
	const { datos, acciones } = accion;
	switch (acciones) {
		case 'SET_LOGIN':
			return {
				...estado,
				...datos,
				sesionIniciada: true,
				tokenValidado: true
			};
		case 'VERIFICAR_USUARIO':
			return {
				...estado,
				...datos,
			};
		case 'CARGAR_DATOS':
			return {
				...estado,
				...datos,
			};
		case 'ACTUALIZAR_DATOS':
			return {
				...estado,
				token: datos.token,
				usuario: datos.usuario,
				sesionIniciada: datos.sesionIniciada,
				tokenValidado: datos.tokenValidado
			};
		case 'VALIDAR_TOKEN':
			return {
				...estado,
				tokenValidado: true
			};
		default:
			return estado;
	}
}