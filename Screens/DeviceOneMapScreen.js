import { useNavigation } from '@react-navigation/core'//maybe @react-navigation/core
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import MapView, {circle, PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { locations } from '../Data/Data';

const DeviceOneMapScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
  }

  return (

    <View style={styles.container}>
      <Text>Devices 1 Location</Text> 

    <View style={styles.containerMap}>
      <MapView 
      provider = {PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion = {{
        latitude: 30.617362211179348,
        longitude: -96.34142443154131,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }}
    >
        {
            locations.map(marker =>(
                <Marker coordinate = {{latitude: marker.latitude, longitude: marker.longitude}} />
            )
        )}

    </MapView>

    </View>

      <TouchableOpacity
      onPress={handleSignOut}
      style = {[styles.button, styles.buttonOutlineSignOut]}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DeviceOneMapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    bacgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems:'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
},
buttonContainer: {
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
},
buttonOutlineDevice: {
  backgroundColor: 'white',
  marginTop: 5,
  borderColor: 'blue',
  borderWidth: 7.5,
  marginBottom: 60,
  marginTop: 30
},
buttonOutlineSignOut: {
  backgroundColor: 'white',
  marginTop: 5,
  borderColor: 'black',
  borderWidth: 7.5,
  marginBottom: 60
},
containerMap: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},

})