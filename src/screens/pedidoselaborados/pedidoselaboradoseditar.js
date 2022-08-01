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
import {useIsFocused} from "@react-navigation/native";

import {Entypo, Ionicons} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";
import Mensaje from "../../components/Mensaje";
import Axios from "../../components/Axios";
import {PedidosLlevarContext} from "../../context/pedidosLlevar/pedidosLlevarContext";
// import UsuarioContext from "../../context/UsuarioContext";

const EditarPedidosElaborados = ({navigation}) => {
	const isFocused= useIsFocused()
	let textoMensaje = "";
	// const { token } = useContext(UsuarioContext);
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHJlZ2lzdHJvIjoxLCJpYXQiOjE2NTkzODE4MzAsImV4cCI6MTY1OTY4MTgzMH0.ksJbvQHOm4h9UbOJXzOaDHj-dMG1UFgCFzJYrT91KKs";
	const [lista, setLista] = useState([]);
	const {
		setIdRegistroElaborados
	} = useContext(PedidosLlevarContext);

	useEffect(() => {
		if(isFocused){
			buscarPedidosElaborados();
		}
	}, [isFocused]);

	function changeHandler(text) {
		setLista((prevLista) => {
			return prevLista.filter((item) => item.iddetallepedido.toString().indexOf(text.toString()) >= 0);
		});
		if (text == "") {
			buscarPedidosElaborados();
		}
	}



	const pressHandler = async (key) =>{
		console.log(key);
		setIdRegistroElaborados(key);
		navigation.navigate('PedidosElaborados', { screen:'EditarForm'});
	}


	const buscarPedidosElaborados = async () => {
		try {
			await Axios.get("/pedidos/pedidoselaborados/listar", {
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
		<ScrollView>
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
							navigation.navigate('PedidosElaborados', { screen:'Listar'})
						}}>
							<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Pedidos Elaborados</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
							navigation.navigate('PedidosElaborados', { screen:'Editar'})
						}} >
							<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Pedidos Elaborados</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
							navigation.navigate('PedidosElaborados', { screen:'Eliminar'})
						}}>
							<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Pedidos Elaborados</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
							navigation.navigate('PedidosElaborados', { screen:'Guardar'})
						}}
						>
							<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Pedidos Elaborados</Text>
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
							Editar Pedidos Elaborados
						</Text>
					</View>
				</View>
				{/* TextInputs */}
				<View >
					<View>
						<TextInput style={styles.input} placeholder='e.j. Filtrar' selectionColor="#777777"
								   onChangeText={changeHandler}

						></TextInput>
					</View>

				</View>
				{/* DropDowns */}
				<View>
					{lista.map((item) => (
						<View key={item.iddetallepedido}>
							<TouchableOpacity style={styles.itemList}
											  onPress={async ()=>pressHandler(item.iddetallepedido, item.idusuario)}>
								<Text>Id de Detalle Pedido: {item.iddetallepedido}</Text>
								<Text>Id de Usuario: {item.idusuario}</Text>
								<Text>Fecha Hora: {item.fechahora}</Text>
							</TouchableOpacity>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default EditarPedidosElaborados;

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