import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Items } from '../database/database'
import { paletaDeColores } from '../styles/colores'
import { Entypo, FontAwesome } from '@expo/vector-icons';
const Inicio = ({ navigation }) => {
    const [products, setProducts] = useState([])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDb()
        })
        return unsubscribe
    }, [navigation])

    const getDataFromDb = () => {
        let productList = []
        let accessoryList = []
        for (let index = 0; index < Items.length; index++) {
            const element = Items[index];
            productList.push(element)
        }

        setProducts(productList)
    }

    // Tarjeta de Producto
    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
                style={
                    {
                        width: '48%',
                        marginVertical: 14,
                    }
                }
            >
                <View style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: paletaDeColores.backgroundLight,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                }}>
                    <Image source={data.productImage} style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    }}>

                    </Image>
                </View>
                <Text style={{
                    fontSize: 12,
                    color: paletaDeColores.black,
                    fontWeight: '600',
                    marginBottom: 2,
                }}>
                    {data.productName}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 18,
                    }}>
                        L. {data.productPrice}
                    </Text>
                    <TouchableOpacity >
                        <View style={{
                            backgroundColor: paletaDeColores.green,
                            borderRadius: 3,
                        }}>
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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={paletaDeColores.backgroundLight} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Entypo name="shopping-bag" style={styles.shoppingBag} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                        <Entypo name="shopping-cart" style={styles.shoppingCart} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Buscar Productos
                    </Text>
                    <Text style={styles.titleParagraph}>
                        Buscar por descripción (e.j. Hamburguesa).
                    </Text>
                </View>
                
                <View style={styles.searchContainer}>
                        <FontAwesome name="search" style={styles.prependInput} />
                        <TextInput style={{
                            width: '90%',
                            height: 40,
                            borderRadius: 5,
                            backgroundColor: paletaDeColores.backgroundLight,
                            paddingHorizontal: 10,
                        }}>
                        </TextInput>
                    </View>
                <View style={{
                    padding: 16,
                }}>

                    <View style={styles.categoryContainer}>
                        <View style={styles.category}>
                            <Text style={styles.categoryText}>Products</Text>
                            <Text style={styles.categoryQty}>41</Text>
                        </View>
                        <View>

                        </View>

                        <Text style={styles.seeAllText}>
                            SeeAll
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                    }}>
                        {
                            products.map(data => {
                                return <ProductCard data={data} key={data.id} />
                            })
                        }
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default Inicio

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: paletaDeColores.white,        
        padding: 16,    
    },
    header: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    shoppingBag: {
        fontSize: 18,
        color: paletaDeColores.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        backgroundColor: paletaDeColores.backgroundLight,
    },
    shoppingCart: {
        fontSize: 18,
        color: paletaDeColores.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: paletaDeColores.backgroundLight,
    },
    titleContainer: {
        marginBottom: 16,
        marginTop: 16,  
        marginBottom: 10,
    },
    titleText: {
        fontSize: 26,
        color: paletaDeColores.black,
        fontWeight: '400',
        letterSpacing: 1,
    },
    titleParagraph: {
        fontSize: 14,
        color: paletaDeColores.black,
        fontWeight: '400',
        letterSpacing: 1,
        opacity: 0.5,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    prependInput : {
        padding:13,
        backgroundColor: paletaDeColores.backgroundDark,                            
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        color: paletaDeColores.white,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 18,
        color: paletaDeColores.black,
        fontWeight: '500',
        letterSpacing: 1,
    },
    categoryQty: {
        fontSize: 14,
        color: paletaDeColores.black,
        fontWeight: '400',
        opacity: 0.5,
        marginLeft: 8,
    },
    seeAllText: {
        fontSize: 14,
        color: paletaDeColores.blue,
        fontWeight: '400',
    }
})