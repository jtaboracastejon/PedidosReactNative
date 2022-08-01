import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListarPedidosMesas from "./listarPedidosMesas";
import GuardarPedidosMesa from "./guardarPedidosMesa";
import EliminarPedidosMesa from "./eliminarPedidosMesa";
import EditarPedidosMesa from "./editarPedidosMesa";
import {Entypo} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditarPedidosMesaForm from "./editarPedidosMesaForm";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

// function PedidosLlevar() {
// 	return (
// 		<Tab.Navigator tabContent>
// 			<Tab.Screen name="Guardar" component={guardarPedidosLlevar} />
// 			<Tab.Screen name="Listar" component={ListarPedidosLlevar} />
// 			<Tab.Screen name="Eliminar" component={EliminarPedidosMesa} />
// 			<Tab.Screen name="Editar" component={EditarPedidosMesa} />
// 		</Tab.Navigator>
// 	);
// }

function PedidosMesa() {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false
		}}>
			<Stack.Screen name="Listar" component={ListarPedidosMesas} />
			<Stack.Screen name="Guardar" component={GuardarPedidosMesa} />
			<Stack.Screen name="Eliminar" component={EliminarPedidosMesa} />
			<Stack.Screen name="Editar" component={EditarPedidosMesa} />
			<Stack.Screen name="EditarPedidosMesaForm" component={EditarPedidosMesaForm} />
		</Stack.Navigator>
	);
}

export default PedidosMesa;

const styles = StyleSheet.create({
	back: {
		fontSize: 22,
		color: paletaDeColores.backgroundMedium,
		padding: 8,
		borderRadius: 10,
		backgroundColor: paletaDeColores.backgroundLight,
	},
})