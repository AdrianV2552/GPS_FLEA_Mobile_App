import { useNavigation } from '@react-navigation/core';//maybe @react-navigation/core
import { StyleSheet, Text, TouchableOpacity, View, NativeModules, FlatList } from 'react-native';
import React, { Component } from 'react';
import { auth } from '../firebase';
import SendSMS from 'react-native-sms'; //will not work with expo
import {Constants} from 'expo';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderNode } from '@rneui/base';

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
  path: '/testTopic',
  id: 'id_' + parseInt(Math.random()*100000)
};
client = new Paho.MQTT.Client(options.host, options.port, options.path);

//const navigation = 0;
const handleSignOut = 0;
const DeviceOne = 0;
const delay = ms => new Promise(res => setTimeout(res, ms));


class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      topic: 'testTopic',
      subscribedTopic: '',
      message: 'morning',
      messageList: [],
      status: ''
    };
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
  }

  //navigation = useNavigation();
  // SMSfunc = SendSMSContainer.sendSMS();//used to try and import function

  waitFunction = async () => {
    await delay(1000);
    console.log("Waited 1s");
    this.subscribeTopic();
    //await delay(1000);
    //console.log("Waited 1s");
    this.sendMessage();
    await delay(1000);
    console.log("Waited 1s");
    this.unSubscribeTopic();

  };

  onConnect = () => {
    console.log('onConnect');
    this.setState({ status: 'connected' });
  }
  // 连接失败
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
          //onSuccess: this.unSubscribeTopic,
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

  sendMessage = () =>{
    //var message = new Paho.MQTT.Message(options.id + ':' + this.state.message);//OG line of code
    var message = new Paho.MQTT.Message(this.state.message);
    message.destinationName = this.state.subscribedTopic;
    client.send(message);
  }

  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

//go to device 1 screen
  DeviceOne = () => {
        //this switches screens to the map
        this.props.navigation.navigate('DeviceOneMapScreen')
        this.connect();
        this.waitFunction();
        //this.subscribeTopic();
        //this.unSubscribeTopic();
        //this.sendMessage();

      //.catch(error => alert(error.message)) //this was causing an error in the expo emulator
  }
render() {
  return (

    <View style={styles.container}>
      <Text>Devices: </Text> 

      <View style = {styles.buttonContainer}>
      <TouchableOpacity
          onPress={this.DeviceOne}//should be DeviceOne
          //onPress={this.subscribeTopic} 
          //onPress={this.sendMessage}
          style={[styles.button, styles.buttonOutlineDevice]}
      >
          <Text style={styles.buttonText}>Device 1</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity
      onPress={this.handleSignOut}
      style = {[styles.button, styles.buttonOutlineSignOut]}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
 }
}

export default HomeScreen

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
}
})