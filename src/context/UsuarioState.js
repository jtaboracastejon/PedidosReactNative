import React, { useReducer } from "react"
import UsuarioContext from "./UsuarioContext"
import UsuarioReducer from "./UsuarioReducer"
import Axios from "../components/Axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mensaje from "../components/Mensaje";

const UsuarioState = (props) => {
	const incialState = {
		usuario: null,
		token: null,
		errores: [],
		msj: "",
		sesionIniciada: false,
		tokenValidado: false
	}
	const [estado, dispath] = useReducer(UsuarioReducer, incialState)
	const setDatos = async () => {
		var sesionIniciada = false;
		var tokenValidado = false;
		const t = (await AsyncStorage.getItem('toke_almacenado'));
		const u = JSON.parse(await AsyncStorage.getItem('usuario_almacenado'));
		if (t) {
			sesionIniciada = true;
			tokenValidado = true;
		}
		dispath({
			datos: {
				usuario: u,
				token: t,
				sesionIniciada: sesionIniciada,
				tokenValidado: tokenValidado
			},
			acciones: 'ACTUALIZAR_DATOS',
		});
	}
	const setCerrarSesion = async () => {
		await AsyncStorage.removeItem('toke_almacenado');
		await AsyncStorage.removeItem('usuario_almacenado');
		dispath({
			datos: {
				usuario: null,
				token: null,
				sesionIniciada: false,
				tokenValidado: false
			},
			acciones: 'ACTUALIZAR_DATOS',
		});
	}
	const setLogin = async (data) => {
		try {
			var textoMensaje = "";
			var usuario = null;
			var token = "";
			await Axios.post('/autenticacion/iniciosesion', {
				usuario: data.usuario,
				contrasena: data.contrasena
			})
				.then(async(data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						usuario = json.datos.usuario;
						token = json.datos.token;
						await AsyncStorage.setItem('toke_almacenado', String(token));
						const u = JSON.stringify(usuario);
						await AsyncStorage.setItem('usuario_almacenado', u);
						textoMensaje = 'Bienvenido ' + usuario.nombre + ' ' + usuario.apellido;
					}
					else {
						textoMensaje = '';
						json.errores.forEach(element => {
							textoMensaje += element.mensaje + '. ';
						});
					}
				})
				.catch((error) => {
					textoMensaje = error;
				});
		} catch (error) {
			textoMensaje = error;
			console.log(error);
		}
		Mensaje({titulo: "Inicio de sesión", msj: textoMensaje});
		dispath({
			datos: {
				usuario: usuario,
				token: token,
			},
			acciones: 'SET_LOGIN',
		});
	}
	return (
		<UsuarioContext.Provider value={{
			usuario: estado.usuario,
			token: estado.token,
			msj: estado.msj,
			inicio: estado.inicio,
			sesionIniciada: estado.sesionIniciada,
			tokenValidado: estado.tokenValidado,
			setLogin,
			setDatos,
			setCerrarSesion,
		}}>
			{props.children}
		</UsuarioContext.Provider>
	)
}
export default UsuarioState;