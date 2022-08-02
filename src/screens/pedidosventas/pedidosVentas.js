import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {paletaDeColores} from "../../styles/colores";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PedidosVentasListar from './pedidosVentasListar';
import PedidosVentasGuardar from './pedidosVentasGuardar';


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function PedidosVentas() {
	return (
		<Stack.Navigator screenOptions={{
			headerShown: false
		}}>
			<Stack.Screen name="Listar" component={PedidosVentasListar} />
            <Stack.Screen name="Guardar" component={PedidosVentasGuardar} />
		</Stack.Navigator>
	);
}

export default PedidosVentas;