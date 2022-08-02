import {View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import {paletaDeColores} from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";
import UsuarioContext from "../../context/UsuarioContext";
import {useIsFocused} from "@react-navigation/native";

const GuardarPedidosCancelados = ({navigation}) =>{
    let textoMensaje = "";
	const { token } = useContext(UsuarioContext);
	const [usuarioOpen, setUsuarioOpen] = useState(false);
	const [numeropedidoOpen, setNumeropedidoOpen] = useState(false);

	const [usuarioValue, setUsuarioValue] = useState(null);
    const [numeropedidoValue, setNumeropedidoValue] = useState(null);

	const [usuario, setIdUsuario] = useState("");
    const [numeropedido, setNumeropedido] = useState("");

	const [usuarioList, setUsuarioList] = useState([{label: 'Maria Jose Arita', value: 1},
		{label: 'Fernando Valenzuela', value: 2}]);
    const [detallepedidoList, setDetallepedidoList] = useState([]);

	// useEffect(() => {
	// 	BuscarUsuario();
	// }, [setUsuarioList]);
	//
	// useEffect(() => {
	// 	BuscarDetalles();
	// }, [setDetallepedidoList]);

	const isFocused= useIsFocused()
	useEffect(() => {
		if(isFocused){
			BuscarDetalles();
		}
	}, [isFocused]);

    const BuscarDetalles = async () =>{
        try {
			await Axios.get("/pedidos/detallepedidos/listar", {
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
							label: element.idregistro.toString(),
							value: element.idregistro.toString(),
						});
						console.log(typeof element.NumeroPedido.toString());
					});
					setDetallepedidoList(jsonitems);
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
    }
    // const BuscarUsuario = async () =>{
    //     try {
	// 		await Axios.get("/pedidos/pedidoscancelados/listarUsuarios", {
	// 			headers: {
	// 				Authorization: "Bearer " + token,
	// 			},
	// 		})
	// 			.then((data) => {
	// 				const json = data.data;
	// 				let jsonitems = [];
	// 				console.log(json[1]);
	// 				json.forEach((element) => {
	// 					jsonitems.push({
	// 						label: element.LoginUsuario.toString(),
	// 						value: element.idregistro.toString(),
	// 					});
	//
	// 				});
	// 				setUsuarioList(jsonitems);
	// 			})
	// 			.catch((error) => {
	// 				textoMensaje = error;
	// 				Mensaje({titulo: "Error registro", msj: textoMensaje});
	// 			});
	// 	} catch (error) {
	// 		textoMensaje = error;
	// 		console.log(error);
	// 		Mensaje({titulo: "Error registro", msj: error});
	// 	}
    // }
    const GuardarPedido = async () =>{
        if (!token) {
			textoMensaje = "Debe iniciar sesion";
			console.log(token);
		} else {
			console.log(token);
			const bodyParameters = {
				numeropedido: numeropedido,
				usuario: usuario,
			};
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			await Axios.post("/pedidos/pedidoscancelados/guardar", bodyParameters, config)
				.then((data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						/* console.log("Solicitud Realizada"); */
						Mensaje({
							titulo: "Registro Pedidos cancelados",
							msj: "Su pedido fue guardado con exito",
						});
						setUsuarioValue(null);
						setNumeropedidoValue(null);
					} else {
						textoMensaje = "";
						json.errores.forEach((element) => {
							textoMensaje = element.mensaje;
							Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
						});
					}
				})
				.catch((error) => {
					textoMensaje = error;
					Mensaje({ titulo: "Error en el registro", msj: 'Ya existe un registro con esa llave primaria'});
				});
		}

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
						navigation.navigate('PedidosCancelados', { screen:'Listar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Pedidos cancelados</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosCancelados', { screen:'Guardar'})
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Pedidos cancelados</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosCancelados', { screen:'Editar'})
					}} >
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Pedidos cancelados</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosCancelados', { screen:'Eliminar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Pedidos cancelados</Text>
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
						Registro de Pedidos cancelados
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
						Id Detalle
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={10}
						onChangeValue={(value) => {
						    setNumeropedido(value);
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
						open={numeropedidoOpen}
						value={numeropedidoValue}
						items={detallepedidoList}
						setOpen={setNumeropedidoOpen}
						setValue={setNumeropedidoValue}
						setItems={setDetallepedidoList}
					/>
				</View>
				<View>
					<Text style={styles.label}>
						Usuarios
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={1}
						searchable={true}
						onChangeValue={(value) => {
							setIdUsuario(value);
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
						open={usuarioOpen}
						value={usuarioValue}
						items={usuarioList}
						setOpen={setUsuarioOpen}
						setValue={setUsuarioValue}
						setItems={setUsuarioList}
					/>

				</View>
				<View style={{width: '50%', alignSelf: 'center'}}>
				<TouchableOpacity style={styles.botonGuardar}
								  onPress={() => {
									  GuardarPedido();
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
export default GuardarPedidosCancelados

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

