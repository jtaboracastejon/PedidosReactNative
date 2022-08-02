import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ListarPedidosCancelados from './ListarPedidosCancelados';

import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuardarPedidosCancelados from './GuardarPedidosCancelados';
import EliminarPedidosCancelados from './EliminarPedidosCancelados';
import EditarPedidosCancelados from './EditarPedidosCancelados'
import EditarPedidosCanceladosForm from './EditarPedidosCanceladosForm'

const Stack = createNativeStackNavigator();

function PedidosCancelados() {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false
		}}>

		<Stack.Screen name="Listar" component={ListarPedidosCancelados} />
		<Stack.Screen name="Guardar" component={GuardarPedidosCancelados} />
		<Stack.Screen name="Eliminar" component={EliminarPedidosCancelados} />
		<Stack.Screen name="Editar" component={EditarPedidosCancelados} /> 
		<Stack.Screen name="EditarForm" component={EditarPedidosCanceladosForm} /> 

 			
{/* 			
			 */}
		</Stack.Navigator>
	);
}

export default PedidosCancelados;