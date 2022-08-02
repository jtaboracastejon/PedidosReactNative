import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ListarPedidos from "./listarPedidos";
import GuardarPedidos from "./guardarPedidos";
import EditarPedidos from './editarPedidos';
import EditarPedidosForm from './editarPedidosForm';
import EliminarPedido from './eliminarPedido';

import { PedidosContext } from '../../context/pedidos/pedidosContexto';

import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PedidosProvider} from "../../context/pedidos/pedidosContexto";

const Stack = createNativeStackNavigator();

function Pedidos() {
	return (
		<PedidosProvider>
			<Stack.Navigator screenOptions={{
				headerShown: false
			}}>
				<Stack.Screen name="Listar" component={ListarPedidos} />
				<Stack.Screen name="Guardar" component={GuardarPedidos} />
				<Stack.Screen name="Editar" component={EditarPedidos} /> 
				<Stack.Screen name="editarPedidosForm" component={EditarPedidosForm} /> 
				<Stack.Screen name="Eliminar" component={EliminarPedido} /> 
			</Stack.Navigator>
		</PedidosProvider>
	);
}

export default Pedidos;