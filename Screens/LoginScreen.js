import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useState} from "react";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
            placeholder="Email"
            value = {email}
            onChangeText = {text => setEmail(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            value = {password}
            onChangeText = {text => setPassword(text)}
            style={styles.input}
            secureTextEntry// makes password text show up dotted
        />
      </View>

      <View style = {styles.buttonContainer}>
        <TouchableOpacity
            onPress={() =>{ }}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() =>{ }}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
inputContainer: {
    width: '80%'
},
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
},
buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
},
button: {
    bacgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems:'center',
},
buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2,
},
buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
},
buttonOutlineText: {
    color: 'black',
    fontWeight: '700',
    fontSize:16,
},
})