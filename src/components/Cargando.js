import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { colores, sizes } from '../styles/colores';
const Cargando = ({texto}) => {
	return (
		<View style={styles.contenedor}>
			<ActivityIndicator size="large" color={'orange'}></ActivityIndicator>
			<View style={styles.contenedorTexto}>
				{
					texto ? (
						<Text>{texto}</Text>
					):(
						<Text>Cargando datos</Text>
					)
				}

			</View>
		</View>
	);
}

export default Cargando;

const styles = StyleSheet.create({

	contenedor: {
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: "center",
		margin:0,
		padding: 20,
		width:"100%",
		height:"100%",
	},
	contenedorTexto: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: "column",
	},
	texto: {
		color: "black",
		textDecorationColor: "yellow",
		textShadowColor: "red",
		textShadowRadius: 1,
		marginTop: 0,
		marginLeft: 10,
		marginRight: 10,
	}
});