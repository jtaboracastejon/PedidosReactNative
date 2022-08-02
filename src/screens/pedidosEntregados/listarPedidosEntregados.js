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
} from "react-native";

import {Entypo, Ionicons} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";
import Mensaje from "../../components/Mensaje";
import Axios from "../../components/Axios";
import UsuarioContext from "../../context/UsuarioContext";
import {useIsFocused} from "@react-navigation/native";

const ListarPedidosEntregados = ({navigation}) => {
	let textoMensaje = "";
	const { token } = useContext(UsuarioContext);
	const [lista, setLista] = useState([]);

	// useEffect(() => {
	// 	buscarPedidosLlevar();
	// }, [setLista]);

	const isFocused= useIsFocused()
	useEffect(() => {
		if(isFocused){
			buscarPedidosEntregados();
		}
	}, [isFocused]);

	function changeHandler(text) {
		setLista((prevLista) => {
			return prevLista.filter((item) => item.iddetalle_pedido.toString().indexOf(text.toString()) >= 0);
		});

		if (text == "") {
			buscarPedidosEntregados();
		}
	}

	const buscarPedidosEntregados = async () => {
		try {
			await Axios.get("/pedidos/entregapedido/listar", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					setLista(data.data);
					console.log(lista);

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
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, backgroundColor: paletaDeColores.blue + '10', borderColor: paletaDeColores.blue, borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosEntregados', { screen:'Listar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Pedidos Entregados</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosEntregados', { screen:'Editar'})
					}} >
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Pedidos Entregados</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosEntregados', { screen:'Eliminar'})
					}}>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Pedidos Entregados</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
						navigation.navigate('PedidosEntregados', { screen:'Guardar'})
					}}
					>
						<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Pedidos Entregados</Text>
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
						Lista de Pedidos Entregados
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
						<View key={item.iddetalle_pedido}>
							<View style={styles.itemList}>
								<Text>Detalle Pedido: {item.iddetalle_pedido}</Text>
								<Text>Usuario {item.usuario}</Text>
								<Text>Fecha Hora: {item.fechahora}</Text>
								<Text>Id Entrega: {item.identrega}</Text>
							</View>
						</View>
					))}
				</View>
		</View>
		</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default ListarPedidosEntregados;

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

