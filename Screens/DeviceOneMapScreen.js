import { useNavigation } from '@react-navigation/core'//maybe @react-navigation/core
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import React, { Component } from 'react';
import { auth } from '../firebase'
import init from 'react_native_mqtt';
import MapView, {circle, PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { locations } from '../Data/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderNode } from '@rneui/base';
//import dgram from 'react-native-udp';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync : {}
});
const options = {
  host: 'broker.emqx.io',
  port: 8083,
  path: '/ESETCOORDINATES',
  id: 'id_' + parseInt(Math.random()*100000)
};
client = new Paho.MQTT.Client(options.host, options.port, options.path);

const delay = ms => new Promise(res => setTimeout(res, ms));



class DeviceOneMapScreen extends Component {
  //navigation = useNavigation();

  constructor(props){
    super(props)
    this.state={
      topic: 'ESETCOORDINATES',
      subscribedTopic: '',
      message: 'morning',
      messageList: [],
      status: ''
    };
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
  }

  waitFunction = async () => {
    await delay(1000);
    console.log("Waited 1s");
    this.subscribeTopic();
    //await delay(1000);
    //console.log("Waited 1s");
    //this.sendMessage();
    await delay(1000);
    console.log("Waited 1s");
    //this.unSubscribeTopic();

  };

  onConnect = () => {
    console.log('onConnect');
    this.setState({ status: 'connected' });
  }

  onFailure = (err) => {
    console.log('Connect failed!');
    console.log(err);
    this.setState({ status: 'failed' });
  }

  connect = () => {
    let x = 0;
    this.setState(//old fix = setState => (
      { status : 'isFetching' },
      () => {
        client.connect({
          onSuccess: this.onConnect,
          //onSuccess: this.subscribeTopic,
          useSSL: false,
          timeout: 3,
          onFailure: this.onFailure
        });
      }
    );
  }

  onConnectionLost=(responseObject)=>{
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  onMessageArrived = (message )=> {
    console.log('onMessageArrived:' + message.payloadString);
    newmessageList = this.state.messageList;
    newmessageList.unshift(message.payloadString);
    this.setState({ messageList: newmessageList });
    // this.MessageListRef.scrollToEnd({animated: false});
  }


  subscribeTopic = () => {
    console.log('//////////////////////////////////////////////subscribeTopic');
    this.setState(
      { subscribedTopic: this.state.topic },
      () => {
        client.subscribe(this.state.subscribedTopic, { qos: 0 });
      }
    );
  }

  unSubscribeTopic = () => {
    client.unsubscribe(this.state.subscribedTopic);
    this.setState({ subscribedTopic: '' });
  }

  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Home")
      })
      .catch(error => alert(error.message))
  }

  connectOrder = () => {
    this.connect();
    this.waitFunction();
    //this.subscribeTopic();
  }

  renderRow = ({ item, index }) => {
    idMessage = item.split(':');
    console.log('>>>ITEM', item);
    return(
      <View 
        style={[
          styles.componentMessage,
          idMessage[0] == options.id ?
            styles.myMessageComponent
          :
            (idMessage.length == 1 ? styles.introMessage : styles.messageComponent),
        ]}
      >
        <Text style={idMessage.length == 1 ? styles.textIntro : styles.textMessage}>
          {item}
        </Text>
      </View>
    )
  }
  _keyExtractor = (item, index) => item + index;
  
  render() {
    const { status, messageList } = this.state;
  return (

    <View style={styles.container}>
      <Text>Devices 1 Location</Text> 



    <View style={styles.containerMap}>
      <MapView 
      provider = {PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion = {{
        latitude: 30.594110,
        longitude: -96.295043,
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
<View>
  

    <View style={styles.messageBox}>
          <FlatList
            ref={ref => (this.MessageListRef = ref)}
            data={messageList}
            renderItem={this.renderRow}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
          />
        </View>


<TouchableOpacity
onPress={this.connectOrder}
style = {[styles.button, styles.buttonOutlineSignOut]}
>
  <Text style={styles.buttonText}>Get Fix</Text>
</TouchableOpacity>
</View>

    </View>

      <TouchableOpacity
      onPress={this.handleSignOut}
      style = {[styles.button, styles.buttonOutlineSignOut]}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

    </View>
  )
}
}

export default DeviceOneMapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageBox:{
    margin: 16,
    flex: 1,
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
    height: Dimensions.get('window').height-900,
},

})