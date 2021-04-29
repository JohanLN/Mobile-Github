import * as React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { storeUser } from '../controllers';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            githubLogin: ""
        }
    }
    

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.h1}>MobileGithub app</Text>
                <KeyboardAvoidingView behavior="height" style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.labels}>Enter your github login</Text>
                        <TextInput onChangeText={(text) => this.setState({githubLogin: text})} style={styles.textInput} />
                    </View>
                    <Button onPress={async () => {
                        await storeUser({githubUser: true, login: this.state.githubLogin}, []);
                        this.props.navigation.push("Tab")}
                    } title="Login" />
                    <Text style={styles.labels}>Or</Text>
                    <TouchableOpacity onPress={async () => {
                        await storeUser({githubUser: false}, []);
                        this.props.navigation.push("Tab")}
                    }>
                        <Text style={styles.clickableText}>Continue as a guest !</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 50,
        textAlign: 'center'
    },
    formContainer: {
        flex: 1,
        marginVertical: "20%",
        marginHorizontal: "10%",
        borderRadius: 20,
        paddingHorizontal: "8%",
        justifyContent: 'space-evenly',
        backgroundColor: 'white'
    },
    inputContainer:{
        height: "15%",
        justifyContent: "space-between",
    },
    textInput: {
        borderWidth: 0.2,
        borderRadius: 20,
        color: 'black'
    },
    labels: {
        fontSize: 12,
        fontStyle: 'italic',
        color: 'grey',
        textAlign: 'center'
    },
    clickableText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'blue'
    }
})