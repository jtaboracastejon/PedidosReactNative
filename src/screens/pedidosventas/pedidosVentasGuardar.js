import {View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import {paletaDeColores} from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";
import text from "react-native-web/dist/exports/Text";
import UsuarioContext from "../../context/UsuarioContext";
import {useIsFocused} from "@react-navigation/native";

const PedidosVentasGuardar = ({navigation}) => {
    let textoMensaje = "";
	const {token} = useContext(UsuarioContext);
    
    const [detallepedidoOpen, setdetallepedidoOpen] = useState(false);
    const [facturaOpen, setfacturaOpen] = useState(false);

    const [detallepedidoValue, setdetallepedidoValue] = useState(null);
    const [facturaValue, setfacturaValue] = useState(null);

    const [iddetallepedido, setiddetalle] = useState("");
    const [idfactura, setidfactura] = useState("");

	const [detallepedidoList, setdetallepedidoList] = useState([]);
    const [pedidosList, setpedidosList] = useState([{label: 1, value:1}]);

    // useEffect(() => {
	// 	Buscardetallepedido();
	// 	BuscarPedidos();
	// }, [setdetallepedidoList]);

	const isFocused= useIsFocused()
	useEffect(() => {
		if(isFocused){
			Buscardetallepedido();
			BuscarPedidos();
		}
	}, [isFocused]);

    const Buscardetallepedido = async () =>{
        try {
			await Axios.get("/pedidos/detallepedidos/listar", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					const json = data.data;
					let jsonitems = [];
					console.log(json[1].NumeroPedido);
					json.forEach((element) => {
						jsonitems.push({
							label: element.idregistro.toString(),
							value: element.idregistro.toString(),
						});

					});
					setdetallepedidoList(jsonitems);
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

    const BuscarPedidos = async () =>{
        try {
			await Axios.get("/pedidos/pedidos/listar", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					const json = data.data;
					let jsonitems = [];
					console.log(json);
					json.forEach((element) => {
						jsonitems.push({
							label: element.NumeroPedido.toString(),
							value: element.NumeroPedido.toString(),
						});

					});
					setpedidosList(jsonitems);
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

    const GuardarPedido = async () => {
		console.log(iddetallepedido)
		console.log(idfactura)
		var textoMensaje = ""
        if (!token) {
			textoMensaje = "Debe iniciar sesion";
			//console.log(token);
		} else {
			//console.log(token);
			const bodyParameters = {
				NumeroFactura: idfactura,
				NumeroPedido: iddetallepedido,
			};
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			await Axios.post("/pedidos/pedidosyventas/guardar", bodyParameters, config)
				.then((data) => {
					const json = data.data;
					// console.log(json)
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Registro Pedidos Elaborados",
							msj: "Su Pedido Elaborado fue guardado con exito",
						});
						navigation.navigate('PedidosVentas', { screen:'Guardar'})
					} else {
						const json = data.data;
						console.log(json.errores)
							Mensaje({
								titulo: "No se pudo realizar la operacion",
								msj: json.errores,
							});


					}
				})
				.catch((error) => {
					textoMensaje = error;
					//Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
					textoMensaje = "";
					console.log(error);
					// console.log(json1)
					// 	json1.errores.forEach((element) => {
					// 		textoMensaje += element.mensaje + ". ";
					// 		Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
					// 	});
				});
		}
		console.log(textoMensaje);
    }

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
						navigation.navigate('PedidosVentas', { screen:'Listar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Pedidos Ventas</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosVentas', { screen:'Guardar'})
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Pedidos Ventas</Text>
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
						Registro de Pedidos Ventas
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
						Numero Factura
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={1}
						searchable={true}
						onChangeValue={(value) => {
							setidfactura(value);
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
					    open={facturaOpen}
					    value={facturaValue}
					    items={pedidosList}
					    setOpen={setfacturaOpen}
					    setValue={setfacturaValue}
					    setItems={setpedidosList}
					/>

				</View>
				<View>
					<Text style={styles.label}>
						Numero Pedido:
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={10}
						onChangeValue={(value) => {
							setiddetalle(value);
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
						open={detallepedidoOpen}
						value={detallepedidoValue}
						items={detallepedidoList}
						setOpen={setdetallepedidoOpen}
						setValue={setdetallepedidoValue}
						setItems={setdetallepedidoList}
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
					<Text style={styles.botonTexto}>Guardar Pedido</Text>
				</TouchableOpacity>
				</View>


			</View>


		</View>
	)
}

export default PedidosVentasGuardar

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