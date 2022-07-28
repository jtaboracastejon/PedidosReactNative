import { View, Text, StyleSheet, StatusBar, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { paletaDeColores } from '../styles/colores'
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons,Entypo } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormTemplate = ({navigation}) => {
    /* Necesario para dateTimePicker */

    const [datePicker, setDatePicker] = useState(false);

    const [date, setDate] = useState(new Date());

    function showDatePicker() {
        setDatePicker(true);
    };


    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };

    /* Necesario para drowpdown 👇 */


    const [open, setOpen] = useState(false);
    const [personasOpen, setPersonasOpen] = useState(false);

    const [value, setValue] = useState(null);
    const [personaValue, setPersonaValue] = useState(null);

    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [personaItems, setPersonaItems] = useState([
        { label: 'Paco', value: 'paco' },
        { label: 'Juan', value: 'juan' }
    ]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                    <Entypo name="chevron-thin-left" style={styles.back} />
                </TouchableOpacity>
            </View>
            <StatusBar backgroundColor={paletaDeColores.backgroundDark} />
            {/* Titles */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: '10%' }}>
                    <Ionicons name="checkmark-done-circle-sharp" size={24} color="black" />
                </View>
                <View style={{
                    borderBottomWidth: 1,
                    borderRadius: 10,
                    borderColor: paletaDeColores.backgroundDark,
                    marginBottom: 16,
                    marginTop: 16,
                    marginBottom: 20,
                }}>
                    <Text style={{
                        fontSize: 24,
                        color: paletaDeColores.black,
                        fontWeight: '600',
                        letterSpacing: 1,
                    }}>
                        Registro de Pedidos Elaborados
                    </Text>
                </View>
            </View>
            {/* TextInputs */}
            <View style={
                {
                    flexDirection: 'column',
                }}>
                <Text style={styles.label}>Nombre del Cliente</Text>
                <TextInput style={styles.input} placeholder='e.j. Javier Castejon' selectionColor="#777777"></TextInput>
            </View>
            {/* DropDowns */}
            <View style={{
                marginTop: 10,
            }}>
                <Text style={styles.label}>
                    Frutas
                </Text>
                <DropDownPicker
                    placeholder='Seleccione una opción'
                    zIndex={3000}
                    zIndexInverse={1000}
                    placeholderStyle={{
                        color: "grey",
                        color: paletaDeColores.backgroundMedium,
                    }}
                    style={{
                        backgroundColor: paletaDeColores.white,
                        borderWidth: 0,
                    }}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                    }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
            <View style={{
                marginTop: 10,
            }}>
                <Text style={styles.label}>
                    Personas
                </Text>
                <DropDownPicker
                    placeholder='Seleccione una opción'
                    zIndex={2000}
                    zIndexInverse={2000}
                    searchable={true}
                    searchPlaceholder="Buscar..."
                    searchTextInputStyle={{
                        borderWidth: 1,
                        borderColor: paletaDeColores.backgroundMedium,
                    }}
                    placeholderStyle={{
                        color: "grey",
                        color: paletaDeColores.backgroundMedium,
                    }}
                    style={{
                        backgroundColor: paletaDeColores.white,
                        borderWidth: 0,
                    }}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                    }}
                    open={personasOpen}
                    value={personaValue}
                    items={personaItems}
                    setOpen={setPersonasOpen}
                    setValue={setPersonaValue}
                    setItems={setPersonaItems}
                />
            </View>


            <View style={{ marginTop: 10, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <TextInput style={styles.inputDatePicker}>
                        {date.toLocaleDateString('es-hn')}
                    </TextInput>

                    {datePicker && (
                        <DateTimePicker
                            locale='es'
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onDateSelected}
                            style={styles.datePicker}
                        />
                    )}

                    {!datePicker && (
                        <TouchableOpacity style={{ backgroundColor: paletaDeColores.blue + '10', borderTopRightRadius: 10, borderBottomRightRadius: 10, }} onPress={showDatePicker}>
                            <Ionicons name="ios-calendar" style={{
                                fontSize: 24,
                                color: paletaDeColores.blue,
                                padding: 10,
                            }} />
                        </TouchableOpacity>
                    )}
                </View>


            </View>
        </View>
    )
}

export default FormTemplate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: paletaDeColores.backgroundLight,
        padding: 16,
        paddingBottom: 0,
    },header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    back: {
        fontSize: 22,
        color: paletaDeColores.backgroundMedium,
        padding: 8,
        borderRadius: 10,
        backgroundColor: paletaDeColores.backgroundLight,
    },
    label: {
        fontSize: 14,
        backgroundColor: paletaDeColores.backgroundLight,
        textAlign: 'left',
        marginBottom: 8,
        marginHorizontal: 10,

    },
    input: {
        backgroundColor: paletaDeColores.white,
        borderRadius: 10,
        padding: 10,
    },
    inputDatePicker: {
        width: '88%',
        backgroundColor: paletaDeColores.white,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10,
        textAlign: 'center',
    },
    MainContainer: {
        flex: 1,
        padding: 6,
        alignItems: 'center',
        backgroundColor: 'white'
    },

    text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
    },

    // Style for iOS ONLY...
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },
})