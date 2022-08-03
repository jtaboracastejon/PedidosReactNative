import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import guardarPedidosXVentas from "./guardarPedidosxVentas";
import ListarPedidosXVentas from "./listarPedidosxVentas";
import EliminarPedidosXVentas from "./eliminarPedidosxVentas";
import EditarPedidosXVentas from "./editarPedidosxVentas";
import {Entypo} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


function PedidosXVentas() {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false
		}}>
			<Stack.Screen name="Guardar" component={guardarPedidosXVentas} />
			<Stack.Screen name="Listar" component={ListarPedidosXVentas} />
			<Stack.Screen name="Eliminar" component={EliminarPedidosXVentas} />
			<Stack.Screen name="Editar" component={EditarPedidosXVentas} />
		</Stack.Navigator>
	);
}

export default PedidosXVentas;

const styles = StyleSheet.create({
	back: {
		fontSize: 22,
		color: paletaDeColores.backgroundMedium,
		padding: 8,
		borderRadius: 10,
		backgroundColor: paletaDeColores.backgroundLight,
	},
})