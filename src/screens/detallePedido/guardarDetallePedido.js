import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { paletaDeColores } from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";
import UsuarioContext from "../../context/UsuarioContext";
import { Items } from '../../database/database';
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';

const GuardarDetallePedido = ({ navigation }) => {
	let textoMensaje = "";
	const { token } = useContext(UsuarioContext);
	const [productsOpen, setproductsOpen] = useState(false);
	const [productsValue, setproductsValue] = useState(null);
	
	const [subproductsOpen, setsubproductsOpen] = useState(false);
	const [subproductsValue, setsubproductsValue] = useState(null);

	const [pedidosValue, setPedidosValue] = useState(null);
	const [pedidosOpen, setPedidosOpen] = useState(false);

	const [idpedido, setIdpedido] = useState("");

	const [products, setProducts] = useState([]);
	const [pedidosList, setPedidosList] = useState([]);


	const [productoId, setproductoId] = useState('0');
	const [subProductoId, setsubProductoId] = useState('0');

	const [cantidad, setCantidad] = useState('0');
	const [notas, setNotas] = useState('');
	const [subproducto, setSubproducto] = useState([])
	const [cancelado, setCancelado] = useState(false)
	const [elaborado, setElaborado] = useState(false)
	const [entregado, setEntregado] = useState(false)
	const [facturado, setFacturado] = useState(false)




	useEffect(() => {
		BuscarPedidos();
		getProducts();
	}, [setPedidosList]);

	const getProducts = () => {
		let productList = []	

		for (let index = 0; index < Items.length; index++) {
			const element = Items[index];
			productList.push(element)
		}
		
		let productKeysAMostrar = [];
		productList.forEach((element) => {
			productKeysAMostrar.push({
				label: element.Nombre.toString(),
				value: element.codigo.toString(),
			});
		});
		
		setSubproducto(productKeysAMostrar)
		setProducts(productKeysAMostrar)
	}

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
					Mensaje({ titulo: "Error registro", msj: textoMensaje });
				});
		} catch (error) {
			textoMensaje = error;
			console.log(error);
			Mensaje({ titulo: "Error registro", msj: error });
		}
	};

	const guardarPedidos = async () => {
		if (!token) {
			textoMensaje = "Debe iniciar sesion";
			console.log(token);
		} else {
			console.log(token);
			const bodyParameters = {
				NumeroPedido: idpedido,
				CodigoProducto: productoId,
				Cantidad: cantidad,
				Notas: notas,
				subproducto: subProductoId,
				Cancelado: cancelado,
				Elaborado: elaborado,
				Entregado: entregado,
				Facturado: facturado
			};
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			await Axios.post("/pedidos/detallepedidos/guardar", bodyParameters, config)
				.then((data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Registro Detalle Pedido",
							msj: "Su registro fue guardado con exito",
						});
						setPedidosValue(null)
						setproductsValue(null);
						setCantidad(null);
						setNotas(null);
						setsubproductsValue(null);
						setCancelado(false);
						setElaborado(false);
						setEntregado(false);
						setFacturado(false);
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
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen: 'Listar' })
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Detalle Pedido</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, backgroundColor: paletaDeColores.blue + '10', borderColor: paletaDeColores.blue, borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen: 'Guardar' })
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Detalle Pedido</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen: 'Editar' })
					}} >
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Detalle Pedido</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen: 'Eliminar' })
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Detalle Pedido</Text>
					</TouchableOpacity>

				</ScrollView>
			</View>
			{/* Titles */}
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={{ width: '10%' }}>
					<FontAwesome5 name="boxes" size={24} color="black" />
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
						Registro de Detalle Pedido
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
			<View style={{ justifyContent: 'space-around', height: '80%', }}>
				<View>
					<Text style={styles.label}>
						Número de Pedido
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
						Código Producto
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={1}
						searchable={true}
						onChangeValue={(value) => {
							setproductoId(value);
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
						open={productsOpen}
						value={productsValue}
						items={products}
						setOpen={setproductsOpen}
						setValue={setproductsValue}
						setItems={setProducts}
					/>

				</View>
				<View>
					<Text style={styles.label}>
						Cantidad
					</Text>
					<TextInput style={styles.input} keyboardType='numeric' value={cantidad} onChangeText={setCantidad}/>
				</View>
				<View>
					<Text style={styles.label}>
						Notas
					</Text>
					<TextInput style={styles.input} value={notas} onChangeText={setNotas}/>
				</View>
				<View>
					<Text style={styles.label}>
						SubProducto
					</Text>
					<DropDownPicker
						placeholder='Seleccione una opción'
						zIndex={1}
						searchable={true}
						onChangeValue={(value) => {
							setsubProductoId(value);
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
						open={subproductsOpen}
						value={subproductsValue}
						items={subproducto}
						setOpen={setsubproductsOpen}
						setValue={setsubproductsValue}
						setItems={setSubproducto}
					/>
				</View>
				<View style={{flexDirection:'row', backgroundColor:paletaDeColores.white, padding:10, borderRadius:10}}>
					<View style={{alignItems:'center'}}>
						<Text style={styles.label2}>
							Cancelado
						</Text>
						<Checkbox value={cancelado} onValueChange={setCancelado}></Checkbox>	
					</View>
					<View style={{alignItems:'center'}}>
						<Text style={styles.label2}>
							Elaborado
						</Text>
						<Checkbox value={elaborado} onValueChange={setElaborado}></Checkbox>	
					</View>
					<View style={{alignItems:'center'}}>
						<Text style={styles.label2}>
							Entregado
						</Text>
						<Checkbox value={entregado} onValueChange={setEntregado}></Checkbox>	
					</View>
					<View style={{alignItems:'center'}}>
						<Text style={styles.label2}>
							Facturado
						</Text>
						<Checkbox value={facturado} onValueChange={setFacturado}></Checkbox>	
					</View>
				</View>

				<View style={{ width: '50%', alignSelf: 'center' }}>
					<TouchableOpacity
						style={styles.botonGuardar}
						onPress={() => {
							guardarPedidos();
						}
						}
					>
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

export default GuardarDetallePedido

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
	label2: {
		fontSize: 14,
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


