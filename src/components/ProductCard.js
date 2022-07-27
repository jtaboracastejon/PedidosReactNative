import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { paletaDeColores } from '../styles/colores'
import { Entypo } from '@expo/vector-icons';

const ProductCard = ({ data }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
            style={styles.cardContainer}
        >
            <View style={styles.cardBackground}>
                <Image source={data.productImage} style={styles.imageCard}/>
            </View>
            <Text style={styles.cartTitle}>
                {data.productName}
            </Text>
            <View style={styles.cardInfoContainer}>
                <Text style={styles.cardInfoTitle}>
                    L. {data.productPrice}
                </Text>
                <TouchableOpacity >
                    <View style={styles.cardInfoButton}>
                        <Entypo name='plus' style={{
                            fontSize: 12,
                            color: paletaDeColores.white,
                            padding: 10,
                        }} />
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
export default ProductCard

const styles = StyleSheet.create({
    cardContainer: 
    {
        width: '48%',
        marginVertical: 14,
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
        fontSize: 12,
        color: paletaDeColores.black,
        fontWeight: '600',
        marginBottom: 2,
    },
    cardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cardInfoTitle:{
        fontSize: 18,
    },
    cardInfoButton:{
        backgroundColor: paletaDeColores.green,
        borderRadius: 3,
    }
})