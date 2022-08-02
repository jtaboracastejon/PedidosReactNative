import React, { useState, useContext, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Keyboard,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ScrollView, StatusBar,
	Alert
} from "react-native";

import {Entypo, Ionicons, FontAwesome5} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";
import Mensaje from "../../components/Mensaje";
import Axios from "../../components/Axios";
import UsuarioContext from "../../context/UsuarioContext";

import Checkbox from 'expo-checkbox';
import { Items } from '../../database/database';
import { useIsFocused } from '@react-navigation/native';

const EliminarDetallePedido = ({navigation}) => {
	let textoMensaje = "";
	const { token } = useContext(UsuarioContext);
	const [lista, setLista] = useState([]);
	const [filtro, setFiltro] = useState("");

	const isFocused = useIsFocused()
	useEffect(() => {
		if (isFocused) {
			buscarDetallePedido();
		}
	}, [isFocused]);

	

	function changeHandler(text) {
		setLista((prevLista) => {
			return prevLista.filter((item) => item.idregistro.toString().indexOf(text.toString()) >= 0);
		});
		if (text == "") {
			buscarDetallePedido();
		}
	}

	const eliminarDetallePedidoAccion = (key) => {
		Alert.alert("Eliminar Registro", "Desea eliminar el registro", [
			{
				text: "Cancelar",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "OK",
				onPress: () => cambiarDecision()
			},
		]);
		const cambiarDecision = () => {
			try {
				console.log(key);
				var textoMensaje = null;
				Axios.delete("pedidos/detallepedidos/eliminar?idregistro=" + key, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
					.then((data) => {
						const json = data.data;
						if (json.errores.length == 0) {
							console.log("Eliminado con exito el registro");
							buscarDetallePedido();
						} else {
							textoMensaje = "";
							json.errores.forEach((element) => {
								textoMensaje += element.mensaje + ". ";
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
		}

		
	};


	const buscarDetallePedido = async () => {
		try {
			await Axios.get("/pedidos/detallepedidos/listar", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					setLista(data.data);

				})

				.catch((error) => {
					textoMensaje = error;
					Mensaje({ titulo: 'Error registro', msj: textoMensaje });
				});
		} catch (error) {
			textoMensaje = error;
			console.log(error);
			Mensaje({ titulo: 'Error registro', msj: error });
		}
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
		<ScrollView>
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
					<Entypo name="chevron-thin-left" style={styles.back}/>
				</TouchableOpacity>
			</View>
			<StatusBar backgroundColor={paletaDeColores.backgroundDark}/>
			{/*Menu Pedidos*/}
			<View
				style={{ height: 30,
					marginTop: 10,
					marginBottom: 10}}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen:'Listar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Detalle Pedido</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen:'Guardar'})
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Detalle Pedido</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen:'Editar'})
					}} >
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Detalle Pedido</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, backgroundColor: paletaDeColores.blue + '10', borderColor: paletaDeColores.blue, borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('DetallePedido', { screen:'Eliminar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Detalle Pedido</Text>
					</TouchableOpacity>
					

				</ScrollView>
			</View>
			{/* Titles */}
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={{width: '10%'}}>
					<FontAwesome5 name="boxes" size={24} color="black"/>
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
						Eliminar DetallePedido
					</Text>
				</View>
			</View>
			{/* TextInputs */}
			<View >
				<View>
					<TextInput style={styles.input} placeholder='e.j. Filtrar' selectionColor="#777777"
							   onChangeText={changeHandler}
							   keyboardType={'numeric'}

					></TextInput>
				</View>
			</View>
			{/* DropDowns */}
				<View>
					{lista.map((item) => (
						<View key={item.idregistro}>
							<TouchableOpacity style={styles.itemList} onPress={()=>eliminarDetallePedidoAccion(item.idregistro)}>
							
								<Text>Id de Registro: {item.idregistro}</Text>
								<Text>Número de Pedido {item.NumeroPedido}</Text>
								<Text>Código Producto {item.CodigoProducto}</Text>
								<Text>Cantidad {item.Cantidad}</Text>
								<Text>Cancelado {item.Cancelado}</Text>
								<Text>Notas {item.Notas}</Text>
								<Text>subproducto {item.subproducto}</Text>
                                <View style={styles.estado}> 
                                    <Text>Elaborado</Text>
                                    <Checkbox style={styles.checkbox} value={item.Elaborado}></Checkbox>
                                </View>
                                <View style={styles.estado}> 
                                    <Text>Entregado</Text>
                                    <Checkbox style={styles.checkbox} value={item.Entregado}></Checkbox>
                                </View>
                                <View style={styles.estado}> 
                                    <Text>Facturado</Text>
                                    <Checkbox style={styles.checkbox} value={item.Facturado}></Checkbox>
                                </View>
							</TouchableOpacity>
						</View>
					))}
				</View>
		</View>
		</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default EliminarDetallePedido;

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
	back: {
		fontSize: 22,
		color: paletaDeColores.backgroundMedium,
		padding: 8,
		borderRadius: 10,
		backgroundColor: paletaDeColores.backgroundLight,
	},
	label2: {
		fontSize: 14,
		textAlign: 'left',
		marginBottom: 8,
		marginHorizontal: 10,

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
		marginTop: 15,
		alignSelf: 'center',
		textAlign: 'center',
		width: '80%',
		padding: 10,
		borderWidth: 1,
		borderRadius: 10
	},
	itemList:{
		padding: 16,
		marginTop: 16,
		borderColor: '#bbb',
		borderWidth: 1,
		borderStyle: 'dashed',
		borderRadius: 10
	},
})