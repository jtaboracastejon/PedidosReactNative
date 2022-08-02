import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { paletaDeColores } from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";

const GuardarPedidos = ({ navigation }) => {
	let textoMensaje = "";
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHJlZ2lzdHJvIjoxLCJpYXQiOjE2NTk0MjU4MDQsImV4cCI6MTY1OTQ1NTgwNH0.-ZY4ZwHCksefv3Tb6AGNcJc2G0wA-vGS92WmvHdhABU";

	const [meserosOpen, setMeserosOpen] = useState(false);
	const [estacionOpen, setEstacionOpen] = useState(false);
	const [activoOpen, setActivoOpen] = useState(false);
	const [modalidadOpen, setModalidadOpen] = useState(false);
	//const [estadoOpen, setEstadoOpen] = useState(false);

	const [meserosValue, setMeserosValue] = useState(null);
	const [estacionValue, setEstacionValue] = useState(null);
	const [activoValue, setActivoValue] = useState(null);
	const [modalidadValue, setModalidadValue] = useState(null);
	//const [estadoValue, setEstadoValue] = useState(null);

	const [idmesero, setIdmesero] = useState("");
	const [Estacion, setEstacion] = useState("");
	const [activo, setActivo] = useState("");
	const [modalidad, setModalidad] = useState("");
	const [estado, setEstado] = useState("NNN");

	const [modalidadList, setModalidadList] = useState([
		{ label: 'Domicilio', value: "DO" },
		{ label: 'Mesa', value: "ME" },
		{ label: 'Llevar', value: "LL" },
	]);
	const [activoList, setActivoList] = useState([
		{ label: 'Finalizado', value: 0 },
		{ label: 'Pendiente', value: 1 },
	]);

	const [meserosList, setMeserosList] = useState([]);
	const [estacionList, setEstacionList] = useState([]);

	useEffect(() => {
		BuscarMeseros();
	}, [setMeserosList]);

	useEffect(() => {
		BuscarEstaciones();
	}, [setEstacionList]);

	const BuscarMeseros = async () => {
		try {
			await Axios.get("/pedidos/pedidos/listarmeseros", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					const json = data.data;
					let jsonitems = [];
					//console.log(json[1]);
					json.forEach((element) => {
						jsonitems.push({
							label: element.nombre.toString(),
							value: element.idmesero.toString(),
						});
						//console.log(typeof element.NumeroPedido.toString());
					});
					setMeserosList(jsonitems);
				})
				.catch((error) => {
					textoMensaje = error;
					Mensaje({ titulo: "Error registro", msj: textoMensaje });
				});
		} catch (error) {
			textoMensaje = error;
			console.log(error);
			Mensaje({ titulo: "Error registro", msj: error });
		}
	}

	const BuscarEstaciones = async () => {
		try {
			await Axios.get("/pedidos/pedidos/listarestaciones", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					const json = data.data;
					let jsonitems = [];
					//console.log(json[1]);
					json.forEach((element) => {
						jsonitems.push({
							label: element.nombre.toString(), //Lo que se va a ver en el dropdown
							value: element.idestacion.toString(), //Lo que se va a guardar en el state
						});
						//console.log(typeof element.NumeroPedido.toString());
					});
					setEstacionList(jsonitems);
				})
				.catch((error) => {
					textoMensaje = error;
					Mensaje({ titulo: "Error registro", msj: textoMensaje });
				});
		} catch (error) {
			textoMensaje = error;
			console.log(error);
			Mensaje({ titulo: "Error registro", msj: error });
		}
	}

	const guardarPedido = async () => {
		if (!token) {
			textoMensaje = "Debe iniciar sesion";
			//console.log(token);
		} else {
			//console.log(token);
			const bodyParameters = {
				idmesero: idmesero, 
				Estacion: Estacion,
				activo: activo,
				modalidad: modalidad,
				estado: estado,
			};
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			await Axios.post("/pedidos/pedidos/guardar", bodyParameters, config)
				.then((data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Registro Pedidos",
							msj: "Su registro fue guardado con exito",
						});
						navigation.navigate("Listar");						
					} else {
						console.log(json.errores);
						textoMensaje = "";
						json.errores.forEach((element) => {
							textoMensaje = element
							Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
						});
					}
				})
				.catch((error) => {
					textoMensaje = error;
				});
		}

	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
					<Entypo name="chevron-thin-left" style={styles.back} />
				</TouchableOpacity>
			</View>
			<StatusBar backgroundColor={paletaDeColores.backgroundDark} />
			<View
				style={{
					height: 30,
					marginTop: 10,
					marginBottom: 10
				}}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, backgroundColor: paletaDeColores.blue + '10', borderColor: paletaDeColores.blue, borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('Pedidos', { screen: 'Listar' })
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Pedidos </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('Pedidos', { screen: 'Guardar' })
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Pedidos </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('Pedidos', { screen: 'Editar' })
					}} >
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Pedidos </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('Pedidos', { screen: 'Eliminar' })
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Pedidos </Text>
					</TouchableOpacity>


				</ScrollView>
			</View>
			{/* Titles */}
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ width: '10%' }}>
					<Ionicons name="checkmark-done-circle-sharp" size={24} color="black" />
				</View>
				<View style={{
					borderBottomWidth: 1,
					borderRadius: 10,
					borderColor: paletaDeColores.backgroundDark,
					marginTop: 16,
					marginBottom: 20,
				}}>
					<Text style={{
						fontSize: 24,
						color: paletaDeColores.black,
						fontWeight: '600',
						letterSpacing: 1,
					}}>
						Registro de Pedidos
					</Text>
				</View>
			</View>
			{/* TextInputs */}
			<View style={
				{
					flexDirection: 'column',
				}}>

			</View>
			{/* DropDowns */}
			<View style={{ justifyContent: 'flex-start' }}>
				<View style={{ height: '80%', }}>
					<View>
						<Text style={styles.label}>Mesero</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							
							searchable={true}
							onChangeValue={(value) => {
								setIdmesero(value);
							}}
							searchPlaceholder="Buscar..."
							searchTextInputStyle={{
								borderWidth: 1,
								borderColor: paletaDeColores.backgroundMedium,
							}}
							placeholderStyle={{
								color: paletaDeColores.backgroundMedium,
							}}
							style={{
								backgroundColor: paletaDeColores.white,
								borderWidth: 0,
							}}
							dropDownContainerStyle={{
								borderWidth: 0,
							}}
							open={meserosOpen}
							value={meserosValue}
							items={meserosList}
							setOpen={setMeserosOpen}
							setValue={setMeserosValue}
							setItems={setMeserosList}
						/>
					</View>
					<View>
						<Text style={styles.label}>Estacion</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							zIndex={3}
							searchable={true}
							onChangeValue={(value) => {
								setEstacion(value);
							}}
							searchPlaceholder="Buscar..."
							searchTextInputStyle={{
								borderWidth: 1,
								borderColor: paletaDeColores.backgroundMedium,
							}}
							placeholderStyle={{
								color: paletaDeColores.backgroundMedium,
							}}
							style={{
								backgroundColor: paletaDeColores.white,
								borderWidth: 0,
							}}
							dropDownContainerStyle={{
								borderWidth: 0,
							}}
							open={estacionOpen}
							value={estacionValue}
							items={estacionList}
							setOpen={setEstacionOpen}
							setValue={setEstacionValue}
							setItems={setEstacionList}
						/>
					</View>
					<View>
						<Text style={styles.label}>Modalidad</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							zIndex={2}
							onChangeValue={(value) => {
								setModalidad(value);
							}}
							/* searchable={true}
							searchPlaceholder="Buscar..."
							searchTextInputStyle={{
								borderWidth: 1,
								borderColor: paletaDeColores.backgroundMedium,
							}} */
							placeholderStyle={{
								color: paletaDeColores.backgroundMedium,
							}}
							style={{
								backgroundColor: paletaDeColores.white,
								borderWidth: 0,
							}}
							dropDownContainerStyle={{
								borderWidth: 0,
							}}
							open={modalidadOpen}
							value={modalidadValue}
							items={modalidadList}
							setOpen={setModalidadOpen}
							setValue={setModalidadValue}
							setItems={setModalidadList}
						/>
					</View>
					<View>
						<Text style={styles.label}>Estado</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							zIndex={1}
							onChangeValue={(value) => {
								setActivo(value);
							}}
							/* searchable={true}
							searchPlaceholder="Buscar..."
							searchTextInputStyle={{
								borderWidth: 1,
								borderColor: paletaDeColores.backgroundMedium,
							}} */
							placeholderStyle={{
								color: paletaDeColores.backgroundMedium,
							}}
							style={{
								backgroundColor: paletaDeColores.white,
								borderWidth: 0,
							}}
							dropDownContainerStyle={{
								borderWidth: 0,
							}}
							open={activoOpen}
							value={activoValue}
							items={activoList}
							setOpen={setActivoOpen}
							setValue={setActivoValue}
							setItems={setActivoList}
						/>
					</View>
				</View>
					<View style={{ width: '50%', alignSelf: 'center' }}>
						<TouchableOpacity style={styles.botonGuardar}
							onPress={() => {
								guardarPedido();
							}}>
							<Ionicons name="save" style={{
								fontSize: 24,
								color: paletaDeColores.white,
								padding: 10,

							}} />
							<Text style={styles.botonTexto}>Guardar</Text>
						</TouchableOpacity>
					</View>


			</View>


		</View>
	)
}

export default GuardarPedidos;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: paletaDeColores.backgroundLight,
		padding: 16,
		paddingBottom: 0,
	}, header: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	botonTexto: {
		color: paletaDeColores.white,
		marginHorizontal: 10,
		fontWeight: '600',
		fontSize: 16
	},
	botonGuardar: {
		flexDirection: 'row',
		padding: 6,
		borderRadius: 20,
		borderColor: 'white',
		backgroundColor:
			paletaDeColores.green,
		borderWidth: 1,
		alignItems: 'center'
	},
	back: {
		fontSize: 22,
		color: paletaDeColores.backgroundMedium,
		padding: 8,
		borderRadius: 10,
		backgroundColor: paletaDeColores.backgroundLight,
	},
	label: {
		fontSize: 14,
		backgroundColor: paletaDeColores.backgroundLight,
		textAlign: 'left',
		marginBottom: 8,
		marginHorizontal: 10,

	},
	input: {
		backgroundColor: paletaDeColores.white,
		borderRadius: 10,
		padding: 10,
	},
	inputDatePicker: {
		width: '88%',
		backgroundColor: paletaDeColores.white,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		padding: 10,
		textAlign: 'center',
	},
	MainContainer: {
		flex: 1,
		padding: 6,
		alignItems: 'center',
		backgroundColor: 'white'
	},

	text: {
		fontSize: 25,
		color: 'red',
		padding: 3,
		marginBottom: 10,
		textAlign: 'center'
	},

	// Style for iOS ONLY...
	datePicker: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: 320,
		height: 260,
		display: 'flex',
	},
	item: {
		alignSelf: 'center',
		width: '40%',
		padding: 10,
		borderWidth: 1,
		borderRadius: 10
	}
})