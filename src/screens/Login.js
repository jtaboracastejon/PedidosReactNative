import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import UsuarioContext from '../context/UsuarioContext';
import Mensaje from '../components/Mensaje';
import Cargando from '../components/Cargando';


const Login = ({navigation}) => {
	const [usuarioText, setUsuarioText] = useState("");
	const [contrasena, setContrasena] = useState("");
	const titulo= 'Inicio de sesión'
	const { setLogin, msj, sesionIniciada, tokenValidado }=useContext(UsuarioContext);
	const [cargarDatos, setCargarDatos] = React.useState(false);
	useEffect(() => {
		setCargarDatos(true);
	}, []);
	/*useEffect(() =>{
	  //Mensaje({titulo: titulo, msj: msj});
	  console.log("hola");
	  console.log(sesionIniciada);
	  if(tokenValidado && sesionIniciada){
		//Mensaje({titulo: titulo, msj: msj});
		navigation.navigate('Menu');
	  }
	}, [iniciarSesion]);*/
	const iniciarSesion = async () => {
		if (usuarioText.length < 3){
			Mensaje({titulo: titulo, msj: 'Escriba el nombre de usuario'});
		}else if(contrasena.length < 6){
			Mensaje({titulo: titulo, msj: 'Escriba la contrasena'});
		}
		else{
			setCargarDatos(false);
			await setLogin({usuario: usuarioText, contrasena: contrasena});
			setCargarDatos(true);
		}
	};
	if(cargarDatos){
		return (
			<View style={styles.contenedor}>
				<View style={styles.contenedorLogin}>
					<View style={styles.contenedorTitulo}>
						<Text style={styles.tituloLogin}>Menú Digital</Text>
					</View>
					<View style={[styles.contenedorControles, styles.sombraControles]}>
						<View style={styles.controles}>
							<TextInput
								placeholder="Escriba el nombre de usuario"
								style={styles.entradas}
								value={usuarioText}
								onChangeText={setUsuarioText}
								autoFocus={true}
							>
							</TextInput>
							<TextInput
								placeholder="Escriba la contraseña"
								style={styles.entradas}
								passwordRules=""
								secureTextEntry={true}
								value={contrasena}
								onChangeText={setContrasena}
							>
							</TextInput>
						</View>
						<View style={styles.contenedorBotones}>
							<View style={styles.boton}>
								<Button title="Iniciar Sesión"
										onPress={iniciarSesion}
										color={'orange'}
								></Button>
							</View>
							<View style={styles.boton}>
								<Button title="Cerrar"
								></Button>
							</View>
						</View>
						<View style={styles.contenedorBotonesRedes}>
							<View style={styles.botonRedes}>
								<Button
									title="Inicio"
									onPress={iniciarSesion}
								></Button>
							</View>
							<View style={styles.botonRedes}>
								<Button
									title="Google" color={"#dc3545"}
								>
								</Button>
							</View>
						</View>

					</View>
				</View>
			</View>
		);
	}
	else{
		return <Cargando texto="Iniciando Sesión"/>;
	}

};
const styles = StyleSheet.create({
	contenedor: {
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: "center",
		margin:0,
		padding: 20,
		width:"100%",
		height:"100%",
	},
	contenedorLogin: {
		alignItems: "stretch",
		justifyContent: 'center',
		height: 530,
		width: 360,
	},
	contenedorTitulo: {
		flex: 1,
		flexDirection:"column",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	contenedorControles: {
		flex: 3,
		flexDirection:"column",
		alignItems: "stretch",
		justifyContent:"center",
		borderWidth: 1,
		borderColor: "#dedede",
		borderRadius: 1,
		backgroundColor:'white',
		padding:10,
	},
	sombraControles: {
		shadowColor: 'gray',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	tituloLogin: {
		color: 'black' ,
		fontSize: 20,
		fontWeight: "500",
	},
	controles:{
		flex:4,
		//backgroundColor: "#29291f",
		marginBottom: 2,
		paddingTop:2,
		paddingLeft:2,
		paddingRight:2,
	},
	contenedorBotones:{
		flex:1,
		padding: 10,
		justifyContent:"space-evenly",
		flexDirection: "row",
	},
	contenedorBotonesRedes:{
		flex:2,
		padding: 10,
		justifyContent:"space-evenly",
		flexDirection: "column",
	},
	boton:{
		flex:1,
		alignItems:"stretch",
		marginLeft:10,
		marginRight:10,
	},
	botonRedes:{
		flex:1,
		alignItems:"stretch",
		margin:5,
	},
	entradas:{
		flex:1,
		alignItems:"stretch",
		margin:10,
		padding:10,
		fontSize: 20,
		fontWeight:"400",
		color: "#495057",
		backgroundColor:"#fff",
		borderWidth:1,
		borderStyle:"solid",
		borderColor: "#ced4da",
		borderRadius: 15,
	}
});
export default Login;