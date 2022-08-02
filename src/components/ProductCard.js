import { View, Text, StyleSheet, TouchableOpacity, Image,ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { paletaDeColores } from '../styles/colores'
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCard = ({ data }) => {
    
    const [product, setProduct] = useState(data)
    
    const addToCart = async(codigo) => {
        let cart = await AsyncStorage.getItem('cart')
        cart = JSON.parse(cart)
        if (cart) {
            let array = cart
            array.push(codigo)

            try {
                await AsyncStorage.setItem('cart', JSON.stringify(array))
                ToastAndroid.show('Añadido al Carrito', ToastAndroid.SHORT)
                console.log(JSON.stringify(array))
            } catch (error) {
                return error
            }
        }else{
            let array = []
            array.push(codigo)

            try {
                await AsyncStorage.setItem('cart', JSON.stringify(array))
                ToastAndroid.show('Added to cart', ToastAndroid.SHORT)
            } catch (error) {
                return error
            }
        }
    }

    return (
        <View            
            style={styles.cardContainer}>
            <View style={styles.cardBackground}>
                <Image source={data.Imagen} style={styles.imageCard}/>
            </View>
            <Text style={styles.cartTitle}>
                {data.Nombre}
            </Text>
            <View style={styles.cardInfoContainer}>
                <Text style={styles.cardInfoTitle}>
                    L. {data.Precio}
                </Text>
                <TouchableOpacity onPress={() => addToCart(product.codigo)}>
                    <View style={styles.cardInfoButton}>
                        <Entypo name='plus' style={{
                            fontSize: 12,
                            color: paletaDeColores.white,
                            padding: 10,
                        }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ProductCard

const styles = StyleSheet.create({
    cardContainer: 
    {
        width: '48%',
        marginVertical: 14,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: paletaDeColores.backgroundLight,
    },
    cardBackground:{
        width: '100%',
        height: 100,
        borderRadius: 10,
        backgroundColor: paletaDeColores.backgroundLight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    imageCard:{        
        width: '80%',
        height: '80%',
        resizeMode: 'contain',   
    },
    cartTitle: {
        fontSize: 14,
        color: paletaDeColores.black,
        fontWeight: '600',
        marginBottom: 2,
        
        marginLeft: 10,
    },
    cardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',    
        marginTop: 8,
        marginLeft: 10,
    },
    cardInfoTitle:{
        fontSize: 18,
    },
    cardInfoButton:{
        backgroundColor: paletaDeColores.green,
        borderBottomRightRadius: 10,
    }
})