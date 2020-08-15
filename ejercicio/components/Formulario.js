import React from 'react'
import {TextInput, View} from 'react-native'

const Formulario = () => {
    return (
        <View>
            <TextInput
                style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Nombre"
            />
            <TextInput
                style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Apellido"
            />
            <TextInput
                style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Cédula"
            />
        </View>
    )
}

export default Formulario