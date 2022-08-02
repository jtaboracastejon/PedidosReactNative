import {View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, TextInput} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import {paletaDeColores} from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons, Entypo, FontAwesome5} from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";
import {DetallePedidoContext} from "../../context/detallePedido/detallePedidoContext";
import UsuarioContext from "../../context/UsuarioContext";
import Checkbox from 'expo-checkbox';
import { Items } from '../../database/database';
import { useIsFocused } from '@react-navigation/native';

const EditarDetallePedidoForm = ({navigation}) => {

	let textoMensaje = "";
	const { token } = useContext(UsuarioContext);	
	const {
		idRegistroC,
		NumeroPedidoC,
		CodigoProductoC,
		CantidadC,
		CanceladoC,
		NotasC,
		ElaboradoC,
		EntregadoC,
		FacturadoC,
		subproductoC
	} = useContext(DetallePedidoContext)

	var detalleSeleccionado={
		idRegistroC,
		NumeroPedidoC,
		CodigoProductoC,
		CantidadC,
		CanceladoC,
		NotasC,
		ElaboradoC,
		EntregadoC,
		FacturadoC,
		subproductoC
	}

	// console.log(detalleSeleccionado)

	const [productsOpen, setproductsOpen] = useState(false);
	const [productsValue, setproductsValue] = useState(detalleSeleccionado.CodigoProductoC.toString());
	
	const [subproductsOpen, setsubproductsOpen] = useState(false);
	const [subproductsValue, setsubproductsValue] = useState(detalleSeleccionado.subproductoC.toString());

	const [pedidosValue, setPedidosValue] = useState(detalleSeleccionado.NumeroPedidoC.toString());
	const [pedidosOpen, setPedidosOpen] = useState(false);

	const [idpedido, setIdpedido] = useState(detalleSeleccionado.NumeroPedidoC.toString());

	const [products, setProducts] = useState([]);
	const [pedidosList, setPedidosList] = useState([]);


	const [productoId, setproductoId] = useState(detalleSeleccionado.CodigoProductoC.toString());
	const [subProductoId, setsubProductoId] = useState(detalleSeleccionado.subproductoC.toString());

	const [cantidad, setCantidad] = useState(detalleSeleccionado.CantidadC.toString());
	// setCantidad(CantidadC);
	const [notas, setNotas] = useState(detalleSeleccionado.NotasC.toString());

	const [subproducto, setSubproducto] = useState([])
	const [cancelado, setCancelado] = useState(detalleSeleccionado.CanceladoC)
	const [elaborado, setElaborado] = useState(detalleSeleccionado.ElaboradoC)
	const [entregado, setEntregado] = useState(detalleSeleccionado.EntregadoC)
	const [facturado, setFacturado] = useState(detalleSeleccionado.FacturadoC)

	const isFocused = useIsFocused()
	useEffect(() => {
		if (isFocused) {			
			BuscarPedidos();
			getProducts();
		}
	}, [isFocused]);

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

	const editarDetallePedido = async () => {
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
			await Axios.put(
				"/pedidos/detallepedidos/editar?idregistro=" + detalleSeleccionado.idRegistroC.toString(),
				bodyParameters,
				config
			)
				.then((data) => {
					const json = data.data;
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Modificar Pedidos Llevar",
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
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen: 'Guardar' })
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Detalle Pedido</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, backgroundColor: paletaDeColores.blue + '10', borderColor: paletaDeColores.blue, borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen: 'Editar' })
					}} >
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Pedidos Llevar</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen: 'Eliminar' })
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Pedidos Llevar</Text>
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
						Modificando Detalle Pedido
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

				<View style={{ width: '60%', alignSelf: 'center', marginBottom:10 }}>
					<TouchableOpacity 
						style={styles.botonEditar}
						onPress={() => {
							editarDetallePedido();
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

export default EditarDetallePedidoForm

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