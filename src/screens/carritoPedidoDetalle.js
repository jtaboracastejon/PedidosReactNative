import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Items } from '../database/database'
import { paletaDeColores } from '../styles/colores'
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from '@expo/vector-icons';

const CarritoPedidoDetalle = ({ navigation }) => {
    const [product, setProduct] = useState()
    const [total, setTotal] = useState(null)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDb()
        })
        return unsubscribe
    }, [navigation])

    //Getting data from database by id
    const getDataFromDb = async () => {
        let items = await AsyncStorage.getItem('cart')
        items = JSON.parse(items)
        console.log(items)
        let productData = []
        if (items) {
            Items.forEach(data => {
                if (items.includes(data.codigo)) {
                    productData.push(data)
                    return
                }
            })
            setProduct(productData)
            getTotal(productData)
        } else {
            setProduct(false)
            getTotal(false)

        }
    }

    const getTotal = async (productData) => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let precioProducto = productData[index].Precio;
            total += precioProducto;
        }
        setTotal(total)
    }

    //Removing product from cart
    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('cart')
        itemArray = JSON.parse(itemArray)
        if (itemArray) {
            let newArray = itemArray;
            for (let index = 0; index < newArray.length; index++) {
                if (newArray[index] == id) {
                    newArray.splice(index, 1)
                }
                await AsyncStorage.setItem('cart', JSON.stringify(newArray))
                getDataFromDb()
            }
        }
    }

    const renderProducts = (data, index) => {
        return (
            <TouchableOpacity
                key={data.codigo}
                style={styles.contenedorProductos}>
                <View style={styles.imageBackground}>
                    <Image source={data.Imagen} style={styles.productImage} />
                </View>
                <View style={styles.contenedorProducto}>
                    <View style={{
                    }}>
                        <Text
                            style={styles.productoNombre}>{data.Nombre}
                        </Text>
                        <View style={styles.contenedorPrecio}>
                            <Text
                                style={styles.precioTexto}>
                                L. {data.Precio}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                borderRadius: 100,
                                marginRight: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: paletaDeColores.backgroundMedium,
                                opacity: 0.5,
                            }}>
                                <MaterialCommunityIcons name="minus" style={{
                                    fontSize: 16,
                                    color: paletaDeColores.backgroundDark
                                }} />
                            </View>
                            <Text>
                                1
                            </Text>
                            <View style={{
                                borderRadius: 100,
                                marginLeft: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: paletaDeColores.backgroundMedium,
                                opacity: 0.5,
                            }}>
                                <MaterialCommunityIcons name="plus" style={{
                                    fontSize: 16,
                                    color: paletaDeColores.backgroundDark
                                }} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                            <MaterialCommunityIcons name="delete-outline" style={{
                                fontSize: 16,
                                color: paletaDeColores.backgroundDark,
                                backgroundColor: paletaDeColores.backgroundLight,
                                padding: 6,
                                borderRadius: 100,
                            }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: paletaDeColores.white
        }}>
            <ScrollView>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="chevron-left" style={{
                            fontSize: 18,
                            color: paletaDeColores.backgroundDark,
                            padding: 12,
                            backgroundColor: paletaDeColores.backgroundLight,
                            borderRadius: 12
                        }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 14,
                        color: paletaDeColores.black,
                        fontWeight: '400',
                    }}>
                        Detalle del Pedido
                    </Text>
                    <View></View>
                </View>
                <Text style={{
                    fontSize: 20,
                    color: paletaDeColores.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    paddingTop: 20,
                    paddingLeft: 16,
                    marginBottom: 10,
                }}>

                </Text>
                <View style={{
                    paddingHorizontal: 16,
                }}>
                    {product ? product.map(renderProducts) : null}
                </View>
                {/* Payment */}
                <View>
                    <View style={{
                        paddingHorizontal: 16,
                        marginTop: 40,
                        marginBottom: 80,

                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: paletaDeColores.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,

                        }}>
                            Resumen de Pedido:
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: paletaDeColores.black,
                                opacity: 0.5,
                            }}>
                                Subtotal
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: paletaDeColores.black,
                                opacity: 0.8,
                            }}>
                                L. {parseFloat(total).toFixed(2)}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: paletaDeColores.black,
                                opacity: 0.5,
                            }}>
                                ISV
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: paletaDeColores.black,
                                opacity: 0.8,
                            }}>
                                L. {parseFloat(total * 0.15).toFixed(2)}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '600',
                                maxWidth: '80%',
                                color: paletaDeColores.black,
                                opacity: 0.8,
                            }}>
                                Total
                            </Text>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: '400',
                                color: paletaDeColores.black,
                                opacity: 0.8,
                            }}>
                                L. {parseFloat(total + total * 0.15).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CarritoPedidoDetalle

const styles = StyleSheet.create({
    contenedorProductos: {
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageBackground: {
        width: '30%',
        height: 100,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: paletaDeColores.backgroundLight,
        borderRadius: 10,
        marginRight: 22,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    contenedorProducto:{
        flex: 1,
        height: "100%",
        justifyContent: 'space-around',
    },
    productoNombre: {
        fontSize: 14,
        maxWidth: '100%',
        color: paletaDeColores.black,
        fontWeight: '600',
        letterSpacing: 1
    },
    contenedorPrecio: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6,
    },
    precioTexto: {
        fontSize: 14,
        fontWeight: '400',
        maxWidth: '85%',
        marginRight: 4,
    }
})