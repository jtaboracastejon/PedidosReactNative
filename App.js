import { StatusBar,  } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Inicio from './src/screens/Inicio';
import CarritoPedidoDetalle from './src/screens/carritoPedidoDetalle';
import FormTemplate from './src/screens/formTemplate';
import { Ionicons } from '@expo/vector-icons';
// import SideMenu from './src/screens/sideMenu';
import PedidosLlevar from "./src/screens/pedidosLlevar/pedidosLlevar";
import EditarPedidosLlevarForm from "./src/screens/pedidosLlevar/editarPedidosLlevarForm";

import PedidosElaborados from "./src/screens/pedidosElaborados/pedidoselaborados";

import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import {PedidosLlevarProvider} from "./src/context/pedidosLlevar/pedidosLlevarContext";
const Drawer = createDrawerNavigator();
function SideMenu() {
    return (
        <Drawer.Navigator 
            drawerContent={(props) => <CustomizeSideMenu {...props} />}
            initialRouteName="Inicio" screenOptions={{
            headerShown: false
        }}>
            <Drawer.Screen name="Inicio" component={Inicio} />
            <Drawer.Screen name="FormTemplate" component={FormTemplate} />
            <Drawer.Screen name="PedidosLlevar" component={PedidosLlevar} />
            <Drawer.Screen name="PedidosElaborados" component={PedidosElaborados} />
            
        </Drawer.Navigator>
    )
}

const CustomizeSideMenu =({navigation})=>{
    return(
        <DrawerContentScrollView>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 10,
            }}>SIGRES </Text>
            <Text style={{
                fontSize: 13,
                fontWeight: '400',
                marginLeft: 10,
                opacity: 0.5,
            }}>Administración </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="home" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Pedidos</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FormTemplate')}>
            <View style={styles.sideMenuItem}>
                    <Ionicons name="document" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Plantilla Formulario</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PedidosLlevar')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="bookmark" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Pedidos Llevar</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PedidosElaborados')}>
                <View style={styles.sideMenuItem}>
                    <Ionicons name="folder" size={24} color="#0043F9" />
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',

                    }}>Pedidos Elaborados</Text>
                </View>
            </TouchableOpacity>

        </DrawerContentScrollView>
    )
}

export default function App() {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <PedidosLlevarProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="SideMenu" component={SideMenu} />
                <Stack.Screen name="CarritoPedidoDetalle" component={CarritoPedidoDetalle} />
                <Stack.Screen name="editarPedidosLlevarForm" component={EditarPedidosLlevarForm} />
                {/* <Stack.Screen name="FormTemplate" component={FormTemplate} /> */}
            </Stack.Navigator>
            </PedidosLlevarProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
    }
});
