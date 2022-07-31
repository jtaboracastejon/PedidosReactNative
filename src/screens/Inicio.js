import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Items } from '../database/database'
import { paletaDeColores } from '../styles/colores'
import { Entypo, FontAwesome } from '@expo/vector-icons';

import ProductCard from '../components/ProductCard';
const Inicio = ({ navigation }) => {
    const [products, setProducts] = useState([])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDb()
        })
        return unsubscribe
    }, [navigation])

    function cambiarBusqueda(text) {
		setProducts((prevProducts) => {
			return prevProducts.filter((item) => item.Nombre.toLowerCase().indexOf(text.toLowerCase()) >= 0);
		});
		if (text == "") {
			getDataFromDb()
		}
	}

    const getDataFromDb = () => {
        let productList = []
        for (let index = 0; index < Items.length; index++) {
            const element = Items[index];
            productList.push(element)
        }

        setProducts(productList)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={paletaDeColores.backgroundDark} />
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Entypo name="menu" style={styles.menu} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CarritoPedidoDetalle')}>
                        <Entypo name="shopping-cart" style={styles.shoppingCart} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Buscar Productos
                    </Text>
                    <Text style={styles.titleParagraph}>
                        Buscar por descripción.
                    </Text>
                </View>
                {/* BLOCK:: Buscador */}
                <View style={styles.searchContainer}>
                        <FontAwesome name="search" style={styles.prependInput} />
                        <TextInput style={styles.searchInput} placeholder="e.j. Hamburguesa" onChangeText={cambiarBusqueda}>
                        </TextInput>
                    </View>
                {/* ENDBLOCK:: Buscador */}

                <View style={styles.categoryContainer}>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>Productos</Text>
                        <Text style={styles.categoryQty}>41</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}>
                    {
                        products.map(data => {
                            return <ProductCard data={data} key={data.codigo} />
                        })
                    }
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
        paddingBottom: 0,
    },
    header: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    menu: {
        fontSize: 22,
        color: paletaDeColores.backgroundMedium,
        padding: 8,
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
    searchInput: {
        width: '90%',
        height: 40,
        borderRadius: 5,
        backgroundColor: paletaDeColores.backgroundLight,
        paddingHorizontal: 10,
    },
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
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
})