import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import {useState} from "react"
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'//maybe @react-navigation/core
import {Card} from 'react-native-paper'

const LoginScreen = () => {
    const [email, setEmail] = useState('Adrianvela@tamu.edu')//should be: useState('') debugging purposes
    const [password, setPassword] = useState('Unreal2552')//should be: useState('') debugging purposes

    const navigation = useNavigation()

    //create listener
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered in with', user.email);
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with', user.email);
        })
        .catch(error => alert(error.message))
    }
    
    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <View style={styles.container}//this is where we import BAAR logo
        >
            <Image
            //for the source url, the image will only appear if you replace "file/d/" with "uc?export=view&id="
            //then delete "/view?usp=sharing" from google drive url png
            source={{uri:"https://drive.google.com/uc?export=view&id=1u4dwu291KZlPHWQiSMvcAk0DonsLkCx6"}}
            style={{width:300, height:200, marginBottom: -100}}
            />
        </View>
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
            onPress={handleLogin}
            style={[styles.button, styles.buttonOutlineLogin]}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutlineRegister]}
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
    paddingVertical: 20,
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
buttonOutlineLogin: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10
},
buttonOutlineRegister: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 100
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