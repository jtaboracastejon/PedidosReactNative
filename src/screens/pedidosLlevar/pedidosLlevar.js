import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import guardarPedidosLlevar from "./guardarPedidosLlevar";
import ListarPedidosLlevar from "./listarPedidosLlevar";
import EliminarPedidosLlevar from "./eliminarPedidosLlevar";
import EditarPedidosLlevar from "./editarPedidosLlevar";
import {Entypo} from "@expo/vector-icons";
import {paletaDeColores} from "../../styles/colores";

const Tab = createMaterialTopTabNavigator();

function PedidosLlevar() {
	return (
		<Tab.Navigator tabContent>
			<Tab.Screen name="Guardar" component={guardarPedidosLlevar} />
			<Tab.Screen name="Listar" component={ListarPedidosLlevar} />
			<Tab.Screen name="Eliminar" component={EliminarPedidosLlevar} />
			<Tab.Screen name="Editar" component={EditarPedidosLlevar} />
		</Tab.Navigator>
	);
}

export default PedidosLlevar;

const styles = StyleSheet.create({
	back: {
		fontSize: 22,
		color: paletaDeColores.backgroundMedium,
		padding: 8,
		borderRadius: 10,
		backgroundColor: paletaDeColores.backgroundLight,
	},
})