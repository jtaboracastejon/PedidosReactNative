import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PedidosElaboradosListar from './pedidoselaboradoslistar';
import PedidosElaboradosGuardar from './pedidoselaboradosguardar';
import pedidoselaboradoseliminar from "./pedidoselaboradoseliminar";
import pedidoselaboradoseditar from "./pedidoselaboradoseditar";
import pedidoselaboradoseditarform from "./pedidoselaboradoseditarform";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function PedidosElaborados() {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false
		}}>
			{/*  />
			
			<Stack.Screen name="Eliminar" component={EliminarPedidosLlevar} />
			<Stack.Screen name="Editar" component={EditarPedidosLlevar} /> */}
            <Stack.Screen name="Guardar" component={PedidosElaboradosGuardar} />
			<Stack.Screen name="Listar" component={PedidosElaboradosListar} />
			<Stack.Screen name="Eliminar" component={pedidoselaboradoseliminar} />
			<Stack.Screen name="Editar" component={pedidoselaboradoseditar} />
			<Stack.Screen name="EditarForm" component={pedidoselaboradoseditarform} />
		</Stack.Navigator>
	);
}

export default PedidosElaborados;