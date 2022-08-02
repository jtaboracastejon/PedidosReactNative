import { StyleSheet, Text, View, Button, TextInput, Image, ScrollView, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';

import UsuarioContext from "../../context/UsuarioContext";
import Mensaje from "../../components/Mensaje";
import {urlImagenesUsuarios} from "../../database/Variables";
import image from "react-native-web/dist/exports/Image";


const PerfilUsuario = ({ navigation }) => {

	const { setLogin, token, msj, usuario, setCerrarSesion } = useContext(UsuarioContext);
	console.log(usuario);
	const [nombreUsuario, setNombreUsuario] = useState(usuario.LoginUsuario);
	const [correo, setCorreo] = useState(usuario.correo);
	const [nombreEmpleado, setNombreEmpleado] = useState(usuario.nombre);
	const [apellidoEmpleado, setApellidoEmpleado] = useState(usuario.apellido);
	const [imagen, setImagen] = useState(usuario.imagen);
	const [modificar, setModificar] = useState(false);
	const titulo = 'Perfil de Usuario';





	const toggleSwitch = () => setModificar(previousState => !previousState);
	useEffect(() => {
		/*setNombreEmpleado(usuario.nombre);
		setApellidoEmpleado(usuario.apellido);
		setLogin(usuario.login);
		setCorreo(usuario.correo);*/
		// console.log(urlImagenesUsuarios + usuario.imagen)
	}, []);
	const actualizarImagen = async () => {
		Mensaje({ titulo: titulo, msj: 'Seleccione la imagen' });

	};
	const cerrarSesion = async () => {
		await setCerrarSesion();
		//navigation.navigate('Login');
	};
	return (
		<ScrollView style={styles.contenedor}>
			<View style={styles.contenedorLogin}>
				<View style={styles.contenedorTitulo}>
					<Text style={styles.tituloLogin}>{titulo}</Text>
				</View>
				<View style={[styles.contenedorControles, styles.sombraControles]}>
					<View>
						<Image
							style={styles.imagen}
							source={require('../../assets/React-icon.svg.png')}
						/>
						{modificar ? (
							<TouchableOpacity
								style={styles.touch}
								onPress={actualizarImagen}
							>
								<Text style={styles.texto}>Editar imagen</Text>
							</TouchableOpacity>
						) : (
							<>
							</>
						)
						}
					</View>

					<View style={styles.controles}>
						<Text style={styles.texto}>Nombre del empleado</Text>
						<TextInput
							placeholder="Escriba el nombre del empleado"
							style={styles.entradas}
							value={nombreEmpleado}
							onChangeText={setNombreEmpleado}
							editable={modificar}
							selectTextOnFocus={modificar}
						/>
						<Text style={styles.texto}>Apellido del empleado</Text>
						<TextInput
							placeholder="Escriba el apellido del empleado"
							style={styles.entradas}
							value={apellidoEmpleado}
							onChangeText={setApellidoEmpleado}
							editable={modificar}
							selectTextOnFocus={modificar}
						>
						</TextInput>
						{!modificar ? (
							<>
								<Text style={styles.texto}>Login del empleado</Text>
								<TextInput
									placeholder="Escriba el login del empleado"
									style={styles.entradas}
									value={nombreUsuario}
									onChangeText={setNombreUsuario}
									editable={false}
									selectTextOnFocus={false}
								></TextInput>
								<Text style={styles.texto}>Correo del empleado</Text>
								<TextInput
									placeholder="Escriba el correo del empleado"
									style={styles.entradas}
									value={correo}
									onChangeText={setCorreo}
									editable={false}
									selectTextOnFocus={false}
								></TextInput>

							</>
						) : (
							<>
							</>
						)

						}

					</View>
					<View style={styles.contenedorBotones}>
						<Switch
							trackColor={{ false: 'orange', true: 'gray' }}
							thumbColor={modificar ? 'orange' : 'gray'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={modificar}
						/>
						<Text style={styles.texto}>{modificar ? "Editando" : "Presione para editar"}</Text>
						<View style={styles.boton}>
							<Button title="Cerrar sesión"
									onPress={cerrarSesion}
							></Button>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	contenedor: {
		backgroundColor: 'white',
		//alignItems: 'center',
		//justifyContent: "center",
		margin: 0,
		width: "100%",
		height: "100%",
	},
	contenedorLogin: {
		flex: 1,
		alignItems: "center",
		justifyContent: 'center',

	},
	contenedorTitulo: {

		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	contenedorControles: {
		flexDirection: "column",
		alignItems: 'center',
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#dedede",
		borderRadius: 15,
		width:'90%'

	},
	sombraControles: {
		shadowColor: 'gray',
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	tituloLogin: {
		color: 'black',
		fontSize: 10,
		fontWeight: "500",
	},
	controles: {
		width: '100%',
		marginBottom: 10,
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,

	},
	contenedorBotones: {
		padding: 10,
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "row",

	},
	contenedorBotonesRedes: {
		padding: 10,
		justifyContent: "space-evenly",
		flexDirection: "column",
		backgroundColor: "#29291f"
	},
	boton: {
		alignItems: "stretch",
		marginLeft: 10,
		marginRight: 10,
	},
	touch: {
		alignItems: "center",
		margin: 10,
		backgroundColor: 'orange',
		padding: 10,
		borderRadius: 45,
	},
	entradas: {
		alignItems: "center",
		marginBottom: 20,
		padding: 10,
		fontSize: 20,
		fontWeight: "400",
		color: "#495057",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#ced4da",
		borderRadius: 15,
	},
	imagen: {
		width: 180,
		height: 180,
		resizeMode: "contain",
		borderWidth: 3,
		borderColor: "#dedede",
		borderRadius: 90,
	},
	texto: {
		color: "black",
		textDecorationColor: "yellow",
		textShadowColor: "red",
		textShadowRadius: 1,
		marginTop: 0,
		marginLeft: 10,
		marginRight: 10,
	}
});
export default PerfilUsuario;