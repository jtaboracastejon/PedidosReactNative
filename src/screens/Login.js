import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import UsuarioContext from '../context/UsuarioContext';
import Mensaje from '../components/Mensaje';
import Cargando from '../components/Cargando';

import { paletaDeColores } from '../styles/colores'
import { AntDesign } from '@expo/vector-icons';

const Login = ({ navigation }) => {
    const [usuarioText, setUsuarioText] = useState("");
    const [contrasena, setContrasena] = useState("");
    const titulo = 'Inicio de sesión'
    const { setLogin, msj, sesionIniciada, tokenValidado } = useContext(UsuarioContext);
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
        if (usuarioText.length < 3) {
            Mensaje({ titulo: titulo, msj: 'Escriba el nombre de usuario' });
        } else if (contrasena.length < 6) {
            Mensaje({ titulo: titulo, msj: 'La contraseña debe ser mayor a 6 caracteres' });
        }
        else {
            setCargarDatos(false);
            await setLogin({ usuario: usuarioText, contrasena: contrasena });
            setCargarDatos(true);
        }
    };
    if (cargarDatos) {
        return (
            <View style={styles.container}>

                <ImageBackground source={require('../assets/Login/background.png')} resizeMode="repeat" imageStyle={{ opacity: 0.1 }} style={styles.backgroundImage}>
                    <View style={styles.loginForm}>
                        <View style={styles.loginFormHeader}>
                            <Image source={require('../assets/logoSigres.png')} style={styles.Logo}></Image>
                            <Text style={styles.logoText}>Sistema de Gestión para Restaurantes</Text>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.label}>Usuario</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="user" style={{
                                    fontSize: 24,
                                    color: paletaDeColores.blue,
                                    padding: 10,
                                    backgroundColor: paletaDeColores.blue + 10,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }} />
                                <TextInput
                                    value={usuarioText}
                                    onChangeText={setUsuarioText}
                                    autoFocus={true}
                                    style={styles.input}
                                    placeholder='e.j. Admin' selectionColor="#777777" />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="lock" style={{
                                    fontSize: 24,
                                    color: paletaDeColores.blue,
                                    padding: 10,
                                    backgroundColor: paletaDeColores.blue + 10,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }} />
                                <TextInput
                                    secureTextEntry
                                    style={styles.input}
                                    placeholder='•••••••••'
                                    selectionColor="#777777"
                                    passwordRules=""
                                    value={contrasena}
                                    onChangeText={setContrasena} />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={styles.botonIniciarSesion} onPress={iniciarSesion}>
                                <Text style={styles.botonIniciarSesionTexto}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    else {
        return <Cargando texto="Iniciando Sesión" />;
    }

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginForm: {
        width: '80%',
        backgroundColor: paletaDeColores.white,
        padding: 10,
        borderRadius: 20,
    },
    loginFormHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: paletaDeColores.backgroundMedium,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: '70%',
    },

    Logo: {
        height: 70,
        width: 70,
    },
    label: {
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 8,
        marginHorizontal: 10,

    },
    input: {
        flex: 1,
        backgroundColor: paletaDeColores.backgroundLight,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
    },
    botonIniciarSesion: {
        padding: 6,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: paletaDeColores.blue,
        borderWidth: 1,
        alignItems: 'center'
    },
    botonIniciarSesionTexto: {
        color: paletaDeColores.white,
        fontWeight: '600',
        fontSize: 16
    }
});
export default Login;