import { StatusBar,  } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Inicio from './src/screens/Inicio';
import CarritoPedidoDetalle from './src/screens/carritoPedidoDetalle';
import FormTemplate from './src/screens/formTemplate';
import { Ionicons } from '@expo/vector-icons';
// import SideMenu from './src/screens/sideMenu';

import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
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
        </DrawerContentScrollView>
    )
}

export default function App() {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="SideMenu" component={SideMenu} />
                <Stack.Screen name="CarritoPedidoDetalle" component={CarritoPedidoDetalle} />
                {/* <Stack.Screen name="FormTemplate" component={FormTemplate} /> */}
            </Stack.Navigator>
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
