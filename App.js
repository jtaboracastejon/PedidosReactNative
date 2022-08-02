import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Inicio from './src/screens/Inicio';
import CarritoPedidoDetalle from './src/screens/carritoPedidoDetalle';
import FormTemplate from './src/screens/formTemplate';

import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import UsuarioContext from './src/context/UsuarioContext';
import Cargando from './src/components/Cargando';

import PedidosLlevar from "./src/screens/pedidosLlevar/pedidosLlevar";
import Login from "./src/screens/Login";
import PedidosMesa from "./src/screens/pedidosMesa/pedidosMesa";

import PedidosCancelados from './src/screens/pedidosCancelados/pedidosCancelados';
import PedidosElaborados from "./src/screens/pedidoselaborados/pedidoselaborados";

import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import {PedidosLlevarProvider} from "./src/context/pedidosLlevar/pedidosLlevarContext";
import UsuarioState from "./src/context/UsuarioState";
import PedidosEntregados from "./src/screens/pedidosEntregados/pedidosEntregados";

const Drawer = createDrawerNavigator();
function SideMenu() {
    return (
        <Drawer.Navigator 
            drawerContent={(props) => <CustomizeSideMenu {...props} />}
            initialRouteName="Inicio" screenOptions={{
            headerShown: false
        }}>
            <Drawer.Screen name="Inicio" component={Inicio} />
            <Drawer.Screen name="FormTemplate" component={FormTemplate} />
            <Drawer.Screen name="PedidosLlevar" component={PedidosLlevar} />
            <Drawer.Screen name="PedidosCancelados" component={PedidosCancelados} />
            <Drawer.Screen name="PedidosElaborados" component={PedidosElaborados} />
            <Drawer.Screen name="PedidosMesa" component={PedidosMesa} />
            <Drawer.Screen name="PedidosEntregados" component={PedidosEntregados} />

        </Drawer.Navigator>
    )
}

const CustomizeSideMenu =({navigation})=>{
    return(
        <DrawerContentScrollView>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 10,
            }}>SIGRES</Text>
            <Text style={{
                fontSize: 13,
                fontWeight: '400',
                marginLeft: 10,
                opacity: 0.5,
            }}>Administración </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="home" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Pedidos</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FormTemplate')}>
            <View style={styles.sideMenuItem}>
                    <Ionicons name="document" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Plantilla Formulario</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PedidosLlevar')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="bookmark" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Pedidos Llevar</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PedidosCancelados')}>
                <View style={styles.sideMenuItem}>
                    <MaterialCommunityIcons name="archive-cancel" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Pedidos Cancelados</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PedidosMesa')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="bookmark" size={24} color="#0043F9" />

                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Pedidos Mesa</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PedidosElaborados')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="folder" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Pedidos Elaborados</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PedidosEntregados')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="folder" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Pedidos Entregados</Text>
                </View>
            </TouchableOpacity>
        </DrawerContentScrollView>


    )
}
const Stack = createNativeStackNavigator();

function MenuNavigator(){
    const { token, setDatos, sesionIniciada, tokenValidado } = React.useContext(UsuarioContext);
    const [inciarAplicacion, setIniciarAplicacion] = React.useState(false);

    React.useEffect(() => {
        setDatos();
        setIniciarAplicacion(true);
    }, [])
    if (inciarAplicacion) {
        return (
            <PedidosLlevarProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {sesionIniciada ? (
                        <>
                            <Stack.Screen name="SideMenu" component={SideMenu}/>
                            <Stack.Screen name="CarritoPedidoDetalle" component={CarritoPedidoDetalle}/>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login}/>
                        </>
                    )
                    }
                    {/* <Stack.Screen name="FormTemplate" component={FormTemplate} /> */}
                </Stack.Navigator>
            </PedidosLlevarProvider>

        )}
        else {
        return <Cargando texto="Cargando aplicación"/>;
        }
}

export default function App() {
    return (
        <NavigationContainer>
        <UsuarioState>
            <MenuNavigator></MenuNavigator>
        </UsuarioState>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
    }
});
