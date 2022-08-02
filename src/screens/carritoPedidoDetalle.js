import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, LogBox, TextInput } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import { Items } from '../database/database'
import { paletaDeColores } from '../styles/colores'
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuarioContext from '../context/UsuarioContext'
import Axios from "../components/Axios";
import Mensaje from "../components/Mensaje";

import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

const CarritoPedidoDetalle = ({ navigation }) => {
    let textoMensaje = "";
    const { token, usuario } = useContext(UsuarioContext);

    const [product, setProduct] = useState()
    const [total, setTotal] = useState(null)

    const [idmesero, setIdmesero] = useState(usuario.idregistro.toString());
    const [Estacion, setEstacion] = useState("1");
    const [activo, setActivo] = useState("1");
    const [estado, setEstado] = useState("NNN");

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDb()
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        })
        return unsubscribe
    }, [navigation])

    //Getting data from database by id
    const getDataFromDb = async () => {
        let items = await AsyncStorage.getItem('cart')
        items = JSON.parse(items)
        // console.log(items)
        let productData = []
        if (items) {
            Items.forEach(data => {
                if (items.includes(data.codigo)) {
                    data.cantidad = 1
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

    //Guardar Pedido
    const guardarPedido = async () => {
        if (!token) {
            textoMensaje = "Debe iniciar sesion";
            //console.log(token);
        } else {
            //console.log(token);
            var bodyParameters = {
                idmesero: idmesero,
                Estacion: estacionValue,
                activo: activo,
                modalidad: modalidadValue,
                estado: estado,
            };
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let ultimoPedido;
            await Axios.post("/pedidos/pedidos/guardar", bodyParameters, config)
                .then((data) => {
                    const json = data.data;
                    if (json.errores.length == 0) {
                        ultimoPedido = json.ultimoIdPedido;
                        console.log("Pedido Guardado");
                    } else {
                        console.log(json.errores);
                        textoMensaje = "";
                        json.errores.forEach((element) => {
                            textoMensaje = element
                            Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
                        });
                    }
                })
                .catch((error) => {
                    textoMensaje = error;
                });
            var productosAGuadar = [
            ];
            product.forEach(data=>{
                productosAGuadar.push({

                    NumeroPedido: ultimoPedido,
                    CodigoProducto: data.codigo,
                    Cantidad: "1",
                    Cancelado: "0",
                    Elaborado: "0",
                    Entregado: "0",
                    Facturado: "0"

                })
            })


            // console.log(productosAGuadar)
            // console.log(product)
            /* Detalle Pedido */
            await Axios.post("/pedidos/detallepedidos/guardarbulk", productosAGuadar, config)
                .then((data) => {
                    const json = data.data;
                    if (json.errores.length == 0) {
                        console.log("Solicitud Realizada");
                        Mensaje({
                            titulo: "Registro Pedidos",
                            msj: "Su registro fue guardado con exito",
                        });
                        AsyncStorage.removeItem('cart')
                        navigation.navigate("Inicio");
                    } else {
                        console.log(json.errores);
                        textoMensaje = "";
                        json.errores.forEach((element) => {
                            textoMensaje = element
                            Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
                        });
                    }
                })
                .catch((error) => {
                    textoMensaje = error;
                });

            /*Guardar Modalidad*/
            if(modalidadValue == 'ME'){
                bodyParameters = {
                    idpedido: ultimoPedido,
                    idpedidomesa: idmesaValue,
                    cuenta: cuentaValue,
                    nombrecuenta: nombrecuentaValue
    
                };
                await Axios.post("/pedidos/pedidosmesa/guardar", bodyParameters, config)
                    .then((data) => {
                        const json = data.data;
                        if (json.errores.length == 0) {
                            console.log("Solicitud Realizada");
                            Mensaje({
                                titulo: "Registro Pedidos Mesa",
                                msj: "Su registro fue guardado con exito",
                            });
                        } else {
                            textoMensaje = "";
                            json.errores.forEach((element) => {
                                textoMensaje = element.mensaje ;
                                Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
                            });
                        }
                    })
                    .catch((error) => {
                        textoMensaje = error;
                    });
            }
            else if(modalidadValue == 'LL'){
                bodyParameters = {
                    idpedido: ultimoPedido,
                    idcliente: clientesValue,
                };
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                await Axios.post("/pedidos/pedidosllevar/guardar", bodyParameters, config)
                    .then((data) => {
                        const json = data.data;
                        if (json.errores.length == 0) {
                            console.log("Solicitud Realizada");
                            Mensaje({
                                titulo: "Registro Pedidos Llevar",
                                msj: "Su registro fue guardado con exito",
                            });
                            setClientesValue(null);
                            setPedidosValue(null);
                        } else {
                            textoMensaje = "";
                            console.log(json.errores)
                            json.errores.forEach((element) => {
                                textoMensaje = element.mensaje;
                                Mensaje({ titulo: "Error en el registro", msj: textoMensaje });
                            });
                        }
                    })
                    .catch((error) => {
                        textoMensaje = error;
                    });
            }
        }

    };



    /*  const addQty = async (id) => {
		 let newArray = product;
		 var index = newArray.map(function (item) { return item.codigo; }).indexOf(id);
		 newArray[index].cantidad = newArray[index].cantidad + 1

		 // setProduct(newArray)
		 setProduct({ ...product, [index]: newArray[index] })
		 console.log(product[index].Nombre, product[index].cantidad)

	 } */

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
                                {data.cantidad}
                            </Text>
                            <View style={{
                                borderRadius: 100,
                                marginLeft: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: paletaDeColores.backgroundMedium,
                                opacity: 0.5,
                            }}>
                                <TouchableOpacity /* onPress={() => addQty(data.codigo)} */>
                                    <MaterialCommunityIcons name="plus" style={{
                                        fontSize: 16,
                                        color: paletaDeColores.backgroundDark
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItemFromCart(data.codigo)}>
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

    const [modalidadOpen, setmodalidadOpen] = useState(false);
    const [modalidadValue, setmodalidadValue] = useState(null);

    const [idmesaValue, setidmesaValue] = useState();
    const [cuentaValue, setcuentaValue] = useState();
    const [nombrecuentaValue, setnombrecuentaValue] = useState(null);

    const [modalidades, setmodalidades] = useState([
        { label: 'Mesa', value: 'ME' },
        { label: 'Llevar', value: 'LL' },
        { label: 'Domicio', value: 'DO' }
    ]);

    const [estacionOpen, setestacionOpen] = useState(false);
    const [estacionValue, setestacionValue] = useState(null);

    const [estaciones, setestaciones] = useState([
        { label: 'Estacion1', value: 1 },
        { label: 'Estacion2', value: 2 },
    ]);

    const [clientesOpen, setClientesOpen] = useState(false);
    const [clientesValue, setClientesValue] = useState(null);
    const [clientesList, setClientesList] = useState([{ label: 'Maria', value: 1 },
        { label: 'Juan', value: 2 }]);

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
                        marginBottom: 20,

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
                            marginBottom: 10,
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
                {/* Estaciones */}
                <View style={{ borderRadius: 100, margin: 20, borderColor: paletaDeColores.blue, borderWidth: 1 }}>
                    <DropDownPicker
                        dropDownDirection="TOP"
                        placeholder='Seleccione una estacion'
                        placeholderStyle={{
                            color: paletaDeColores.backgroundMedium,
                        }}
                        style={{
                            backgroundColor: paletaDeColores.white,
                            borderWidth: 0,
                            borderRadius: 100
                        }}
                        dropDownContainerStyle={{
                            borderWidth: 0,
                        }}
                        open={estacionOpen}
                        value={estacionValue}
                        items={estaciones}
                        setOpen={setestacionOpen}
                        setValue={setestacionValue}
                        setItems={setestaciones}
                    />
                </View>
                {/* Modalidad */}
                <View style={{ borderRadius: 100, margin: 20, borderColor: paletaDeColores.blue, borderWidth: 1 }}>
                    <DropDownPicker
                        dropDownDirection="TOP"
                        placeholder='Seleccione una opción'
                        placeholderStyle={{
                            color: paletaDeColores.backgroundMedium,
                        }}
                        style={{
                            backgroundColor: paletaDeColores.white,
                            borderWidth: 0,
                            borderRadius: 100
                        }}
                        dropDownContainerStyle={{
                            borderWidth: 0,
                        }}
                        open={modalidadOpen}
                        value={modalidadValue}
                        items={modalidades}
                        setOpen={setmodalidadOpen}
                        setValue={setmodalidadValue}
                        setItems={setmodalidades}
                    />
                </View>
                {
                    modalidadValue === 'ME' ?
                        <View>
                            <View style={
                                {
                                    flexDirection: 'column',
                                    padding: 10
                                }}>
                                <Text style={styles.label}>No. Mesa</Text>
                                <TextInput style={styles.input}  onChange={setidmesaValue} placeholder='e.j. 3' selectionColor="#777777" keyboardType='numeric'></TextInput>
                            </View>
                            <View style={
                                {
                                    flexDirection: 'column',
                                    padding: 10
                                }}>
                                <Text style={styles.label}>Cuenta</Text>
                                <TextInput style={styles.input}  onChange={setcuentaValue} placeholder='e.j. 1' selectionColor="#777777" keyboardType='numeric'></TextInput>
                            </View>
                            <View style={
                                {
                                    flexDirection: 'column',
                                    padding: 10
                                }}>
                                <Text style={styles.label}>Nombre Cuenta</Text>
                                <TextInput style={styles.input} onChange={setnombrecuentaValue}  placeholder='e.j. Javier' selectionColor="#777777" ></TextInput>
                            </View>
                        </View>

                        : modalidadValue === 'LL' ?
                            <View style={
                                {
                                    flexDirection: 'column',
                                    padding: 10
                                }}>
                                <Text style={styles.label}>
                                    Cliente
                                </Text>
                                <DropDownPicker
                                    zIndex={1}
                                    placeholder='Seleccione una opción'
                                    searchable={true}                                    
                                    searchPlaceholder="Buscar..."
                                    searchTextInputStyle={{
                                        borderWidth: 1,
                                        borderColor: paletaDeColores.backgroundMedium,
                                    }}
                                    placeholderStyle={{
                                        color: paletaDeColores.backgroundMedium,
                                    }}
                                    style={{
                                        backgroundColor: paletaDeColores.backgroundLight,
                                        borderWidth: 0,
                                    }}
                                    dropDownContainerStyle={{
                                        borderWidth: 0,
                                    }}
                                    open={clientesOpen}
                                    value={clientesValue}
                                    items={clientesList}
                                    setOpen={setClientesOpen}
                                    setValue={setClientesValue}
                                    setItems={setClientesList}
                                />

                            </View>
                            : null
                }
                <View style={{ width: '65%', alignSelf: 'center' }}>
                    <TouchableOpacity
                        style={styles.botonGuardarPedido}
                        onPress={() => {
                            guardarPedido();
                        }}>
                        <FontAwesome5 name="cash-register" style={{
                            fontSize: 24,
                            color: paletaDeColores.white,
                            padding: 10,
                        }} />
                        <Text style={styles.botonTexto}>Procesar Pedido</Text>
                    </TouchableOpacity>
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
    contenedorProducto: {
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
    },
    botonGuardarPedido: {
        flexDirection: 'row',
        padding: 6,
        borderRadius: 100,
        borderColor: 'white',
        backgroundColor: paletaDeColores.blue,
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
    },
    botonTexto: {
        color: paletaDeColores.white,
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center'
    },
    label: {
        fontSize: 14,
        backgroundColor: paletaDeColores.white,
        textAlign: 'left',
        marginBottom: 8,
        marginHorizontal: 10,

    },
    input: {
        backgroundColor: paletaDeColores.backgroundLight,
        borderRadius: 10,
        padding: 10,
    }
})