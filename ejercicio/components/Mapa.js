import React, {useEffect, useState} from "react";
import {StyleSheet, Platform, Button, View} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from "react-native-permissions";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const Mapa = () => {

    const [posicion, guardarPosicion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    const [lugares, guardarLugares] = useState([]);

    //Se obtiene la posicion cuando se renderiza el componente
    useEffect(() => {
        obtenerPermisos().then(()=>console.log('Exito')).catch(e => console.log(e));
    }, [])

    const obtenerPermisos = async () => {
        if(Platform.OS === 'ios'){
            const respuesta = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if(respuesta === 'granted'){
                obtenerPosicionActual();
            }
        }else{
            const respuesta = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if(respuesta === 'granted'){
                obtenerPosicionActual();
            }

        }
    }
    const obtenerPosicionActual = () => {
        Geolocation.getCurrentPosition(position => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
            guardarPosicion(region);
        })
    }
    const handleMapPress = (e) => {
        const nuevoLugar = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
        }
        nuevoLugar.id = uuidv4();
        guardarLugares([...lugares, nuevoLugar]);
    }
    const cleanMarkers = () => {
        guardarLugares([]);
    }

    return (
        <View  style={styles.view}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={posicion}
                style={styles.map}
                showsUserLocation={true}
                minZoomLevel={15}
                maxZoomLevel={15}
                loadingEnabled={true}
                onPress={handleMapPress}
            >
                {
                    lugares.map(lugar => (
                        <Marker
                            key={lugar.id}
                            coordinate={{latitude: lugar.latitude, longitude: lugar.longitude}}
                        />
                    ))
                }
            </MapView>
            <Button
                title="Limpiar marcadores"
                onPress={cleanMarkers}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    view: {
        flex: 1,
        position: 'relative'
    },
})
export default Mapa
