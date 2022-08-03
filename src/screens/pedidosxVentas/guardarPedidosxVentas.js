import {View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import {paletaDeColores} from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";

const GuardarPedidosXVentas = ({navigation}) => {
	let textoMensaje = "";
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHJlZ2lzdHJvIjoxLCJpYXQiOjE2NTkxMDYyMjMsImV4cCI6MTY1OTEzNjIyM30.cVRlDuZWYCdo-rVn7Lje9cfqrjodTqaM72tF5kWCv18";
	const [pedidosOpen, setPedidosOpen] = useState(false);
	const [clientesOpen, setClientesOpen] = useState(false);
	const [pedidosValue, setPedidosValue] = useState(null);
	const [clientesValue, setClientesValue] = useState(null);
	const [idpedido, setIdpedido] = useState("");
	const [idcliente, setIdcliente] = useState("");

	const [clientesList, setClientesList] = useState([{label: 1, value: 1},
		{label: 2, value: 2}]);
	const [pedidosList, setPedidosList] = useState([]);
	


	const [NumeroFacturaOpen, setNumeroFacturaOpen] = useState(false);
	const [NumeroPedidoOpen, setNumeroPedidoOpen] = useState(false);
	const [NumeroFacturaValue, setNumeroFacturaValue] = useState(null);
	const [NumeroPedidoValue, setNumeroPedidoValue] = useState(null);
	const [NumeroFactura, setNumeroFactura] = useState("");
	const [NumeroPedido, setNumeroPedido] = useState("");

	const [NumeroPedidoList, setNumeroPedidoList] = useState([{label: 1, value: 1},
		{label: 2, value: 2}]);
	const [NumeroFacturaList, setNumeroFacturaList] = useState([]);
	
	useEffect(() => {
		BuscarPedidosXVentas();
	}, [setNumeroFacturaList]);

	const BuscarPedidosXVentas = async () => {
		try {
			await Axios.get("pedidosyVentas/listar", {
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
					setNumeroFacturaList(jsonitems);
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

	const guardarPedidosXVentas = async () => {
		if (!token) {
			textoMensaje = "Debe iniciar sesion";
			console.log(token);
		} else {
			console.log(token);
			const bodyParameters = {
				NumeroFactura: NumeroFactura,
				NumeroPedido: NumeroPedido,
			};
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			await Axios.post("pedidosyVentas/guardar", bodyParameters, config)
				.then((data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Registro Pedidos X Ventas",
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
				<TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
					<Entypo name="chevron-thin-left" style={styles.back}/>
				</TouchableOpacity>
			</View>
			<StatusBar backgroundColor={paletaDeColores.backgroundDark}/>
			<View
				style={{ height: 30,
					marginTop: 10,
					marginBottom: 10}}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, backgroundColor: paletaDeColores.blue + '10', borderColor: paletaDeColores.blue, borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosXVentas', { screen:'Listar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Pedidos X Ventas </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosXVentas', { screen:'Editar'})
					}} >
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Pedidos X Ventas </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosXVentas', { screen:'Eliminar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Pedidos X Ventas </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosXVentas', { screen:'Guardar'})
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Pedidos X Ventas </Text>
					</TouchableOpacity>

				</ScrollView>
			</View>
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
						Registro de Pedidos X Ventas
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
					Numero de factura
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={10}
						onChangeValue={(value) => {
							setNumeroFactura(value);
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
						open={NumeroFacturaOpen}
						value={NumeroFacturaValue}
						items={NumeroFacturaList}
						setOpen={setNumeroFacturaOpen}
						setValue={setNumeroFacturaValue}
						setItems={setNumeroFacturaList}
					/>
				</View>
				<View>
					<Text style={styles.label}>
					Numero de Pedido
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={1}
						searchable={true}
						onChangeValue={(value) => {
							setNumeroPedido(value);
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
						open={NumeroPedidoOpen}
						value={NumeroPedidoValue}
						items={NumeroPedidoList}
						setOpen={setNumeroPedidoOpen}
						setValue={setNumeroPedidoValue}
						setItems={setNumeroPedidoList}
					/>

				</View>
				<View style={{width: '50%', alignSelf: 'center'}}>
				<TouchableOpacity style={styles.botonGuardar}
								  onPress={() => {
									  guardarPedidosXVentas();
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

export default GuardarPedidosXVentas

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
	botonTexto:{
		color: paletaDeColores.white,
		marginHorizontal: 10,
		fontWeight: '600',
		fontSize: 16
	},
	botonGuardar:{
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


