import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import guardarPedidosEntregados from "./guardarPedidosEntregados";
import ListarPedidosEntregados from "./listarPedidosEntregados";
import EliminarPedidosEntregados from "./eliminarPedidosEntregados";
import EditarPedidosEntregados from "./editarPedidosEntregados";
import {Entypo} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditarPedidosEntregadosForm from "./editarPedidosEntregadosForm";

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

function PedidosEntregados() {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false
		}}>
			<Stack.Screen name="Listar" component={ListarPedidosEntregados} />
			<Stack.Screen name="Guardar" component={guardarPedidosEntregados} />
			<Stack.Screen name="Eliminar" component={EliminarPedidosEntregados} />
			<Stack.Screen name="Editar" component={EditarPedidosEntregados} />
			<Stack.Screen name="editarPedidosLlevarForm" component={EditarPedidosEntregadosForm} />
		</Stack.Navigator>
	);
}

export default PedidosEntregados;

const styles = StyleSheet.create({
	back: {
		fontSize: 22,
		color: paletaDeColores.backgroundMedium,
		padding: 8,
		borderRadius: 10,
		backgroundColor: paletaDeColores.backgroundLight,
	},
})