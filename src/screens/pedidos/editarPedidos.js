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

import Checkbox from 'expo-checkbox';
import {useIsFocused} from "@react-navigation/native";

import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { paletaDeColores } from "../../styles/colores";
import Mensaje from "../../components/Mensaje";
import Axios from "../../components/Axios"

import {PedidosContext} from "../../context/pedidos/pedidosContexto";
import UsuarioContext from "../../context/UsuarioContext";

const EditarPedidos = ({navigation}) => {
    let textoMensaje = "";
	const { token } = useContext(UsuarioContext);
	const [lista, setLista] = useState([]);
    const {
		setNumeroPedidoC,
		setIdmeseroC,
        setEstacionC,
        setActivoC, 
        setModalidadC,
		setEstadoC,
	} = useContext(PedidosContext);

    const isFocused = useIsFocused()
	useEffect(() => {
		if (isFocused) {
			buscarPedidos();
		}
	}, [isFocused]);

	function changeHandler(text) {
		if (text == "") {
			buscarPedidos();
		}
		setLista((prevLista) => {
			return prevLista.filter((item) => item.NumeroPedido.toString().indexOf(text.toString()) >= 0);
		});
	}


    
	const pressHandler = (item) => {
		setNumeroPedidoC(item.NumeroPedido);
		setIdmeseroC(item.idmesero);
        setEstacionC(item.Estacion);
        setActivoC(item.activo);
        setModalidadC(item.modalidad);   
		setEstadoC(item.estado);
		navigation.navigate('editarPedidosForm');
	};

    const buscarPedidos = async () => {
		try {
			await Axios.get("/pedidos/pedidos/listar", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					data.data.forEach(datas => {
						datas.nombremesero = datas.mesero.nombre;
						datas.nombreestacion = datas.estacione.nombre
					});
					setLista(data.data);
					//console.log(lista);

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

								<Text style={{ color: paletaDeColores.black, marginHorizontal: 10, }}>Listar Pedidos</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
								navigation.navigate('Pedidos', { screen: 'Guardar' })
							}}>
								<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Agregar Pedidos</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
								navigation.navigate('Pedidos', { screen: 'Editar' })
							}} >
								<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Editar Pedidos</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{ padding: 5, borderRadius: 100, borderColor: 'coral', borderWidth: 1, marginHorizontal: 10 }} onPress={() => {
								navigation.navigate('Pedidos', { screen: 'Eliminar' })
							}}>
								<Text style={{ color: paletaDeColores.black, marginHorizontal: 10 }}>Eliminar Pedidos</Text>
							</TouchableOpacity>


						</ScrollView>
					</View>
					{/* Titles */}
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ width: '10%' }}>
							<FontAwesome5 name="box-open" size={24} color="black" />
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
								Lista de Pedidos
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
							<View key={item.NumeroPedido}>
								<TouchableOpacity style={styles.itemList} onPress={()=>pressHandler(item)} >
									<Text>Numero del Pedido: {item.NumeroPedido}</Text>
									<Text>Mesero: {item.nombremesero}</Text>
									<Text>Estación: {item.nombreestacion}</Text>
									<Text>Estado: {item.activo == 0 ? 'Finalizado' : 'Pendiente'}</Text>
									<Text>Modalidad: {item.modalidad === 'DO' ? 'Domicilio' : item.modalidad === 'LL' ? 'LLevar' : 'Mesa'}</Text>
									<Text>Fecha: {item.fechahora}</Text>
									<View style={styles.estado}>
										<Text>Elaborado</Text>
										{item.estado[0] != 'S' ? <Checkbox style={styles.checkbox}/> : <Checkbox style={styles.checkbox} value={1} />}
										<Text>Facturado</Text>
										{item.estado[1] != 'S' ? <Checkbox style={styles.checkbox}/> : <Checkbox style={styles.checkbox} value={1} />}
										<Text>Entregado</Text>
										{item.estado[2] != 'S' ? <Checkbox style={styles.checkbox}/> : <Checkbox style={styles.checkbox} value={1} />}
									</View>
								</TouchableOpacity>
							</View>
						))}
					</View>

				</View>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
}

export default EditarPedidos;

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
	itemList: {
		padding: 16,
		marginTop: 16,
		borderColor: '#bbb',
		borderWidth: 1,
		borderStyle: 'dashed',
		borderRadius: 10
	},
	estadoText: {
		fontSize: 15,
		color: '#000',
		//fontWeight: 'bold',
		marginTop: 15,
		textAlign: 'center'
	},
	estado: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#eee',
		padding: 10,
		marginTop: 10,
		borderColor: '#bbb',
		borderWidth: 1,
		borderStyle: 'dashed',
		borderRadius: 10
	},
	checkbox: {
		margin: 4,
	}
})