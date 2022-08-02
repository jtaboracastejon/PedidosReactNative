import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import {paletaDeColores} from '../../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons, Entypo} from '@expo/vector-icons';
import Axios from "../../components/Axios";
import Mensaje from "../../components/Mensaje";

import {PedidosContext} from "../../context/pedidos/pedidosContexto";
import UsuarioContext from "../../context/UsuarioContext";

const EditarPedidosForm = ({navigation}) => {

    const{
        NumeroPedidoC,
        idmeseroC,
        EstacionC,
        activoC, 
        modalidadC,             
        estadoC, 

    } = useContext(PedidosContext);

    var PedidosSelect = {
        NumeroPedidoC,
        idmeseroC,
        EstacionC,
        activoC, 
        modalidadC,             
        estadoC,        
    };
    console.log(PedidosSelect);
    let textoMensaje = "";
	const { token } = useContext(UsuarioContext);
    const [meserosOpen, setMeserosOpen] = useState(false);
	const [estacionOpen, setEstacionOpen] = useState(false);
	const [activoOpen, setActivoOpen] = useState(false);
	const [modalidadOpen, setModalidadOpen] = useState(false);
	//const [estadoOpen, setEstadoOpen] = useState(false);

	const [meserosValue, setMeserosValue] = useState(PedidosSelect.idmeseroC);
	const [estacionValue, setEstacionValue] = useState(PedidosSelect.EstacionC);
	const [activoValue, setActivoValue] = useState(PedidosSelect.activoC == 1 ? 1 : 0);
	const [modalidadValue, setModalidadValue] = useState(PedidosSelect.modalidadC);
	//const [estadoValue, setEstadoValue] = useState(null);

	const [idmesero, setIdmesero] = useState("");
	const [Estacion, setEstacion] = useState("");
	const [activo, setActivo] = useState(PedidosSelect.activoC);
	const [modalidad, setModalidad] = useState(PedidosSelect.modalidadC);
	const [estado, setEstado] = useState(PedidosSelect.estadoC);

    const [modalidadList, setModalidadList] = useState([
		{ label: 'Domicilio', value: "DO" },
		{ label: 'Mesa', value: "ME" },
		{ label: 'Llevar', value: "LL" },
	]);
	const [activoList, setActivoList] = useState([
		{ label: 'Finalizado', value: 0 },
		{ label: 'Pendiente', value: 1 },
	]);

	const [meserosList, setMeserosList] = useState([]);
	const [estacionList, setEstacionList] = useState([]);

    useEffect(() => {
		BuscarMeseros();
	}, [setMeserosList]);

	useEffect(() => {
		BuscarEstaciones();
	}, [setEstacionList]);
    
    const editarPedidos = async () => {
		if (!token) {
			textoMensaje = "Debe iniciar sesion";
			//console.log(token);
		} else {
			console.log(token);
			const bodyParameters = {
				idmesero: idmesero, 
				Estacion: Estacion,
				activo: activo,
				modalidad: modalidad,
				estado: estado,
			};
            console.log(bodyParameters);
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};
			//console.log(idcliente, idpedido, idRegistro);
			await Axios.put(
				"/pedidos/pedidos/editar?id=" + PedidosSelect.NumeroPedidoC,
				bodyParameters,
				config
			)
				.then((data) => {
					const json = data.data;
                    //console.log(json);
					if (json.errores.length == 0) {
						console.log("Solicitud Realizada");
						Mensaje({
							titulo: "Registro Pedidos",
							msj: "Su registro fue editado con exito",
						});
						navigation.goBack();
					} else {
						textoMensaje = "";
						json.errores.forEach((element) => {
							textoMensaje = element;
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

    const BuscarMeseros = async () => {
		try {
			await Axios.get("/pedidos/pedidos/listarmeseros", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					const json = data.data;
					let jsonitems = [];
					//console.log(json[1]);
					json.forEach((element) => {
						jsonitems.push({
							label: element.nombre.toString(),
							value: element.idmesero,
						});
						//console.log(typeof element.NumeroPedido.toString());
					});
					setMeserosList(jsonitems);
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

	const BuscarEstaciones = async () => {
		try {
			await Axios.get("/pedidos/pedidos/listarestaciones", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((data) => {
					const json = data.data;
					let jsonitems = [];
					//console.log(json[1]);
					json.forEach((element) => {
						jsonitems.push({
							label: element.nombre.toString(), //Lo que se va a ver en el dropdown
							value: element.idestacion, //Lo que se va a guardar en el state
						});
						//console.log(typeof element.NumeroPedido.toString());
					});
					setEstacionList(jsonitems);
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

    return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack}>
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
			<View style={{ justifyContent: 'flex-start' }}>
				<View style={{ height: '80%', }}>
					<View>
						<Text style={styles.label}>Mesero</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							
							searchable={true}
							onChangeValue={(value) => {
								setIdmesero(value);
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
							open={meserosOpen}
							value={meserosValue}
							items={meserosList}
							setOpen={setMeserosOpen}
							setValue={setMeserosValue}
							setItems={setMeserosList}
						/>
					</View>
					<View>
						<Text style={styles.label}>Estacion</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							zIndex={3}
							searchable={true}
							onChangeValue={(value) => {
								setEstacion(value);
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
							open={estacionOpen}
							value={estacionValue}
							items={estacionList}
							setOpen={setEstacionOpen}
							setValue={setEstacionValue}
							setItems={setEstacionList}
						/>
					</View>
					<View>
						<Text style={styles.label}>Modalidad</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							zIndex={2}
							onChangeValue={(value) => {
								setModalidad(value);
							}}
							/* searchable={true}
							searchPlaceholder="Buscar..."
							searchTextInputStyle={{
								borderWidth: 1,
								borderColor: paletaDeColores.backgroundMedium,
							}} */
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
							open={modalidadOpen}
							value={modalidadValue}
							items={modalidadList}
							setOpen={setModalidadOpen}
							setValue={setModalidadValue}
							setItems={setModalidadList}
						/>
					</View>
					<View>
						<Text style={styles.label}>Estado</Text>
						<DropDownPicker
							placeholder='Seleccione una opción'
							zIndex={1}
							onChangeValue={(value) => {
								setActivo(value);
							}}
							/* searchable={true}
							searchPlaceholder="Buscar..."
							searchTextInputStyle={{
								borderWidth: 1,
								borderColor: paletaDeColores.backgroundMedium,
							}} */
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
							open={activoOpen}
							value={activoValue}
							items={activoList}
							setOpen={setActivoOpen}
							setValue={setActivoValue}
							setItems={setActivoList}
						/>
					</View>
				</View>
					<View style={{ width: '65%', alignSelf: 'center' }}>
                    <TouchableOpacity style={styles.botonEditar}
									  onPress={() => {
										  editarPedidos();
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

export default EditarPedidosForm;

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
    botonEditar:{
		flexDirection: 'row',
		padding: 6,
		borderRadius: 20,
		borderColor: 'white',
		backgroundColor: paletaDeColores.blue,
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