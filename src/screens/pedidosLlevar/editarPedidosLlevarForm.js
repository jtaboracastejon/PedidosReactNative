import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import {paletaDeColores} from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";
import {PedidosLlevarContext} from "../../context/pedidosLlevar/pedidosLlevarContext";

const EditarPedidosLlevarForm = ({navigation}) => {

	let textoMensaje = "";
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHJlZ2lzdHJvIjoxLCJpYXQiOjE2NTkxMDYyMjMsImV4cCI6MTY1OTEzNjIyM30.cVRlDuZWYCdo-rVn7Lje9cfqrjodTqaM72tF5kWCv18";
	const {idRegistro} = useContext(PedidosLlevarContext)
	const [pedidosOpen, setPedidosOpen] = useState(false);
	const [clientesOpen, setClientesOpen] = useState(false);
	const [pedidosValue, setPedidosValue] = useState(null);
	const [clientesValue, setClientesValue] = useState(null);
	const [idpedido, setIdpedido] = useState("");
	const [idcliente, setIdcliente] = useState("");
	const [clientesList, setClientesList] = useState([{label: 1, value: 1},
		{label: 2, value: 2}]);
	const [pedidosList, setPedidosList] = useState([]);


	useEffect(() => {
		BuscarPedidos();
	}, [setPedidosList]);

	const editarPedidosLlevar = async () => {
		if (!token) {
			textoMensaje = "Debe iniciar sesion";
			console.log(token);
		} else {
			console.log(token);
			const bodyParameters = {
				idpedido: idpedido,
				idcliente: idcliente,
			};
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			console.log(idcliente, idpedido, idRegistro);
			await Axios.put(
				"/pedidos/pedidosLlevar/editar?id=" + idRegistro,
				bodyParameters,
				config
			)
				.then((data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Registro Pedidos Llevar",
							msj: "Su registro fue editado con exito",
						});
						navigation.goBack();
					} else {
						textoMensaje = "";
						json.errores.forEach((element) => {
							textoMensaje += element.mensaje + ". ";
							Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
						});
					}
				})
				.catch((error) => {
					textoMensaje = error;
				});
		}
		console.log(textoMensaje);

	};


	const BuscarPedidos = async () => {
		try {
			await Axios.get("/pedidos/pedidos/listar", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					const json = data.data;
					let jsonitems = [];
					console.log(json[1]);
					json.forEach((element) => {
						jsonitems.push({
							label: element.NumeroPedido.toString(),
							value: element.NumeroPedido.toString(),
						});
						console.log(typeof element.NumeroPedido.toString());
					});
					setPedidosList(jsonitems);
				})
				.catch((error) => {
					textoMensaje = error;
					Mensaje({titulo: "Error registro", msj: textoMensaje});
				});
		} catch (error) {
			textoMensaje = error;
			console.log(error);
			Mensaje({titulo: "Error registro", msj: error});
		}
	};

	const guardarPedidos = async () => {
		if (!token) {
			textoMensaje = "Debe iniciar sesion";
			console.log(token);
		} else {
			console.log(token);
			const bodyParameters = {
				idpedido: idpedido,
				idcliente: idcliente,
			};
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			await Axios.post("/pedidos/pedidosllevar/guardar", bodyParameters, config)
				.then((data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Registro Pedidos Llevar",
							msj: "Su registro fue guardado con exito",
						});
					} else {
						textoMensaje = "";
						json.errores.forEach((element) => {
							textoMensaje += element.mensaje + ". ";
							Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
						});
					}
				})
				.catch((error) => {
					textoMensaje = error;
				});
		}
		console.log(textoMensaje);
	};
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Entypo name="chevron-thin-left" style={styles.back}/>
				</TouchableOpacity>
			</View>
			<StatusBar backgroundColor={paletaDeColores.backgroundDark}/>
			{/* Titles */}
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{width: '10%'}}>
					<Ionicons name="checkmark-done-circle-sharp" size={24} color="black"/>
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
						Editar Pedidos Llevar
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
			<View style={{justifyContent: 'space-around', height: '80%',}}>
				<View>
					<Text style={styles.label}>
						Id Pedido
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={10}
						onChangeValue={(value) => {
							setIdpedido(value);
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
						open={pedidosOpen}
						value={pedidosValue}
						items={pedidosList}
						setOpen={setPedidosOpen}
						setValue={setPedidosValue}
						setItems={setPedidosList}
					/>
				</View>
				<View>
					<Text style={styles.label}>
						Id Cliente
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={1}
						searchable={true}
						onChangeValue={(value) => {
							setIdcliente(value);
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
						open={clientesOpen}
						value={clientesValue}
						items={clientesList}
						setOpen={setClientesOpen}
						setValue={setClientesValue}
						setItems={setClientesList}
					/>

				</View>
				<View style={{width: '65%', alignSelf: 'center'}}>
					<TouchableOpacity style={styles.botonEditar}
									  onPress={() => {
										  editarPedidosLlevar();
									  }}>
						<Entypo name="edit" style={{
							fontSize: 24,
							color: paletaDeColores.white,
							padding: 10,
						}} />
						<Text style={styles.botonTexto}>Guardar cambios</Text>
					</TouchableOpacity>
				</View>
			</View>


		</View>
	)
}

export default EditarPedidosLlevarForm

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
	botonEditar:{
		flexDirection: 'row',
		padding: 6,
		borderRadius: 20,
		borderColor: 'white',
		backgroundColor: paletaDeColores.blue,
		borderWidth: 1,
		alignItems: 'center'
	},
	botonTexto:{
		color: paletaDeColores.white,
		marginHorizontal: 10,
		fontWeight: '600',
		fontSize: 16
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