import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListarDetallePedido from "./listarDetallePedido";
import {Entypo} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuardarDetallePedido from './guardarDetallePedido';
import EliminarDetallePedido from './eliminarDetallePedido';
import EditarDetallePedido from './editarDetallePedido';
import EditarDetallePedidoForm from './editarDetallePedidoForm';

import {DetallePedidoProvider} from "../../context/detallePedido/detallePedidoContext";
const Stack = createNativeStackNavigator();


function DetallePedido() {
	return (
		<DetallePedidoProvider>		
			<Stack.Navigator screenOptions={{
				headerShown: false
			}}>
				<Stack.Screen name="Guardar" component={GuardarDetallePedido} />
				<Stack.Screen name="Listar" component={ListarDetallePedido} />
				<Stack.Screen name="Eliminar" component={EliminarDetallePedido} />
				<Stack.Screen name="Editar" component={EditarDetallePedido} />
				<Stack.Screen name="editarDetallePedidoForm" component={EditarDetallePedidoForm} />
			</Stack.Navigator>
		</DetallePedidoProvider>
	);
}

export default DetallePedido;

const styles = StyleSheet.create({
	back: {
		fontSize: 22,
		color: paletaDeColores.backgroundMedium,
		padding: 8,
		borderRadius: 10,
		backgroundColor: paletaDeColores.backgroundLight,
	},
})